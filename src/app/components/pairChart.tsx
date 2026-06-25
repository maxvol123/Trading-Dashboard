'use client'
import { CandlestickSeries, createChart, ISeriesApi } from "lightweight-charts";
import { Candle, fetchCandles } from "../lib/binance"
import { useEffect, useRef, useState } from "react";
import {sizes, Interval, INTERVALS} from "../options"
import { useBinanceKline } from "../../../hooks/useBinanceKline";
interface Props {
    initialCandles: Candle[]
    symbol: string
}
export default function ({initialCandles, symbol}: Props) {
    const [candles, setCandles] = useState<Candle[]>(initialCandles)
    const containerRef = useRef<HTMLDivElement>(null)
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
    const [currentInterval, setCurrentInterval] = useState<Interval>('1h');
    const [loading, setLoading] = useState<boolean>(false)
    const state = useBinanceKline(symbol, currentInterval)
    useEffect(()=>{
        if (containerRef.current) {
            const chart = createChart(containerRef.current, {
                autoSize: true,
            });
            const candlestickSeries = chart.addSeries(CandlestickSeries, {
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            candlestickSeries.setData(candles)
            seriesRef.current = candlestickSeries
            return () => {
            chart.remove();  // cleanup
            seriesRef.current = null;
            }
        }
    }, [candles])
    
    useEffect(()=>{
        if (state.status === "success" && seriesRef.current) {
            seriesRef.current.update(state.data)
        }
    }, [state])
    async function changeInterval(interval:Interval) {
        setLoading(true)
        setCurrentInterval(interval)
        const newCandles = await fetchCandles(symbol.toUpperCase(), interval, 200);
        if (!newCandles) {
                console.error(`Failed to load ${symbol} for interval ${interval}`);
                return;
        }
        setCandles(newCandles)
        setLoading(false)
    }
return (
    <div>
        <div className="flex flex-row select-none mb-2">
            {INTERVALS.map(interval => (
                <button
                    key={interval}
                    className={`mr-3 px-2 ${
                        interval === currentInterval
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-400'
                    }`}
                    onClick={() => changeInterval(interval)}
                    disabled={loading}  // ← блокируем кнопки во время загрузки
                >
                    {interval}
                </button>
            ))}
            {loading && <span className="ml-2 text-sm text-gray-500">Loading...</span>}
        </div>
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: sizes.PAIR_CHART_HEIGHT,
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s',
            }}
        />
    </div>
);
        
    
}
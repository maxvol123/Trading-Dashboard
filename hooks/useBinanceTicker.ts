'use client';

import { useState, useEffect } from 'react';
import { BinanceData, BinanceTickerInfo } from '../lib/types';


type TickerState =
    | { status: 'loading' }
    | { status: 'success'; data: BinanceTickerInfo }
    | { status: 'error'; code: 'not_found' | 'connection_lost'; message: string };

export function useBinanceTicker(symbol: string):TickerState  {
    const [state, setState] = useState<TickerState>({ status: 'loading' })

    useEffect(()=>{
        setState({status: "loading"})
        const wss = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`)
        wss.onopen = () => {
        };  
        const timeoutId = setTimeout(() => {
            setState({ status: 'error', code: "not_found" , message: `Symbol ${symbol} not found` });
            wss.close();
        }, 5000);
        wss.onmessage = (event) => {
            clearTimeout(timeoutId)
            const dataFromBinance:BinanceData = JSON.parse(event.data)
            const uiData:BinanceTickerInfo = {
                symbol: dataFromBinance.s,
                price: parseFloat(dataFromBinance.c),
                priceChangePercent: parseFloat(dataFromBinance.P),
                high: parseFloat(dataFromBinance.h),
                low: parseFloat(dataFromBinance.l),
                volume: parseFloat(dataFromBinance.v),
            }
            setState({status: "success", data: uiData})
        }
        wss.onclose = () => {
        }
        wss.onerror = (error) => {
            console.error(error)
            setState({status: "error", code: "connection_lost", message: `Lost connection Error`})
            clearTimeout(timeoutId);
        }
        return () => {
            clearTimeout(timeoutId);
            wss.close();
        };
    }, [symbol])
return state  
}
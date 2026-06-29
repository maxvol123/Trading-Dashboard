import { UTCTimestamp } from "lightweight-charts"
import {Interval} from "../options"
import { BinanceTickerInfo } from "./types"
export interface Candle {
    time: UTCTimestamp
    open: number
    high: number
    low: number
    close: number
}
export interface BinanceTicker24h {
    symbol: string;
    priceChangePercent: string;
    lastPrice : string;
    volume: string;
    highPrice: string;
    lowPrice: string;
    openTime: string;
}
export async function fetchCandles(symbol: string, interval: Interval, limit: number = 100): Promise<Candle[] | null>{
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
        if (!response.ok) {
           console.log('error, fetchCandles, response not ok');
           return null
        }
        const data: unknown[][] = await response.json();
        const ans:Candle[] = data.map((candle)=>({
            time: Math.floor(Number(candle[0]) / 1000) as UTCTimestamp,
            open: parseFloat(candle[1] as string),
            high: parseFloat(candle[2] as string),
            low: parseFloat(candle[3] as string),
            close: parseFloat(candle[4] as string),
        }))
        return ans
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function fetchMultiplePairs(): Promise<BinanceTickerInfo[] | null>{
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr`)
        if (!response.ok) {
           console.log('error, fetchMultiplePairs, response not ok');
           return null
        }
        const data: BinanceTicker24h[] = await response.json();
        const ans:BinanceTickerInfo[] = data.map((t)=>({
            symbol: t.symbol,
            price: parseFloat(t.lastPrice),
            priceChangePercent: parseFloat(t.priceChangePercent),
            high: parseFloat(t.highPrice),
            low: parseFloat(t.lowPrice),
            volume: parseFloat(t.volume),
            date: parseFloat(t.openTime)
        }))
        return ans
    } catch (error) {
        console.log(error)
        return null
    }
}
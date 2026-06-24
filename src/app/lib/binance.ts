import { UTCTimestamp } from "lightweight-charts"
import {Interval} from "../options"
export interface Candle {
    time: UTCTimestamp
    open: number
    high: number
    low: number
    close: number
}
export async function fetchCandles(symbol: string, interval: Interval, limit: number = 100): Promise<Candle[] | null>{
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
        if (!response.ok) {
           console.log('error, fetchCandles, response not ok');
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
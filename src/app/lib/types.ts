// General data

import { UTCTimestamp } from "lightweight-charts";

// https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams#individual-symbol-ticker-streams
export interface BinanceData {
    "e": string,      // Event type
    "E": number,     // Event time
    "s": string,          // Symbol
    "p": string,          // Price change
    "P": string,          // Price change percent
    "w": string,          // Weighted average price
    "x": string,          // First trade(F)-1 price (first trade before the 24hr rolling window)
    "c": string,          // Last price
    "Q": string,              // Last quantity
    "b": string,          // Best bid price
    "B": string,              // Best bid quantity
    "a": string,          // Best ask price
    "A": string,             // Best ask quantity
    "o": string,          // Open price
    "h": string,          // High price
    "l": string,          // Low price
    "v": string,           // Total traded base asset volume
    "q": string,              // Total traded quote asset volume
    "O": number,                 // Statistics open time
    "C": number,          // Statistics close time
    "F": number,                 // First trade ID
    "L": number,             // Last trade Id
    "n": number              // Total number of trades
}
export interface BinanceKlineData {
    "k": {
        "t": number, // Kline start time
        "o": string,  // Open price
        "c": string,  // Close price
        "h": string,  // High price
        "l": string,  // Low price
        "x": boolean // Is this kline closed?
  }
}
// Simple data for UI
export interface BinanceTickerInfo {
    symbol: string;
    price: number;
    priceChangePercent: number;
    high: number;
    low: number;
    volume: number;
    date: number;
}

export interface BinanceKlineInfo {
    time: UTCTimestamp;
    open: number;
    high : number;
    low: number;
    close: number;
}
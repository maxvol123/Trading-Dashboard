'use client';

import { useState, useEffect } from 'react';
import { BinanceData, BinanceTickerInfo } from '../src/app/lib/types';


type TickerState =
    | { status: 'loading' }
    | { status: 'reconnecting'; attempt: number }
    | { status: 'success'; data: BinanceTickerInfo }
    | { status: 'error'; code: 'not_found' | 'connection_lost'; message: string };

export function useBinanceTicker(symbol: string):TickerState  {
    const [state, setState] = useState<TickerState>({ status: 'loading' })
    const MAX_ATTEMPTS = 10;
    useEffect(()=>{
        let wss: WebSocket | null = null
        let reconnectTimer: NodeJS.Timeout | null = null;
        let attemptNumber:number = 0
        let intentionallyClosed = false
        let timeoutId: NodeJS.Timeout | null = null
        let notFoundDetected = false
        function connect() {
        wss = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`)
        timeoutId = setTimeout(() => {
            setState({ status: 'error', code: "not_found" , message: `Symbol ${symbol} not found` });
            notFoundDetected = true 
            wss?.close();
        }, 20000);
        wss.onopen = ()=>{
            attemptNumber = 0
        }
        wss.onmessage = (event) => {
            if (timeoutId) clearTimeout(timeoutId);
            const dataFromBinance:BinanceData = JSON.parse(event.data)
            const uiData:BinanceTickerInfo = {
                symbol: dataFromBinance.s,
                price: parseFloat(dataFromBinance.c),
                priceChangePercent: parseFloat(dataFromBinance.P),
                high: parseFloat(dataFromBinance.h),
                low: parseFloat(dataFromBinance.l),
                volume: parseFloat(dataFromBinance.v),
                date: dataFromBinance.E
            }
            setState({status: "success", data: uiData})
        }
        wss.onclose = () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (!intentionallyClosed && !notFoundDetected) scheduleReconnect();  
        }
        // wss.onerror = (error) => {
        //     console.error(error)
        //     setState({status: "error", code: "connection_lost", message: `Lost connection Error`})
        //     clearTimeout(timeoutId);
        // }
        }
        function scheduleReconnect() {
    if (attemptNumber >= MAX_ATTEMPTS) {
        setState({
            status: 'error',
            code: 'connection_lost',
            message: `Failed to connect after ${MAX_ATTEMPTS} attempts`
        });

        return;
    }
    setState({
        status: "reconnecting",
        attempt: attemptNumber,
    })
    const delay = Math.min(30000, 1000 * Math.pow(2, attemptNumber));
    console.log(delay);
    
    attemptNumber++;
    reconnectTimer = setTimeout(connect, delay);
}
        connect()
        return () => {
            intentionallyClosed = true;
            if (reconnectTimer) clearTimeout(reconnectTimer);
            if (timeoutId) clearTimeout(timeoutId);
            if (wss) wss.close();
        };
    }, [symbol])
return state  
}
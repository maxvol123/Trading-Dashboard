'use client';

import { useState, useEffect } from 'react';
import type {BinanceKlineData, BinanceKlineInfo} from '../src/app/lib/types';
import { Interval } from '@/app/options';
import { UTCTimestamp } from 'lightweight-charts';


type TickerState =
    | { status: 'loading' }
    | { status: 'reconnecting'; attempt: number }
    | { status: 'success'; data: BinanceKlineInfo, isClose: boolean }
    | { status: 'error'; code: 'not_found' | 'connection_lost'; message: string };

export function useBinanceKline(symbol: string, interval: Interval):TickerState  {
    const [state, setState] = useState<TickerState>({ status: 'loading' })
    const MAX_ATTEMPTS = 10;
    useEffect(()=>{
        console.log('USEEFFECT FIRED:', symbol, interval);
        let wss: WebSocket | null = null
        let reconnectTimer: NodeJS.Timeout | null = null;
        let attemptNumber:number = 0
        let intentionallyClosed = false
        let timeoutId: NodeJS.Timeout | null = null
        let notFoundDetected = false
        function connect() {
            console.log('CONNECTING TO:', interval);
        wss = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`)
        timeoutId = setTimeout(() => {
            setState({ status: 'error', code: "not_found" , message: `Symbol ${symbol} not found` });
            notFoundDetected = true 
            wss?.close();
        }, 5000);
        wss.onopen = ()=>{
            attemptNumber = 0
        }
        wss.onmessage = (event) => {
            if (timeoutId) clearTimeout(timeoutId);
            const dataFromBinance:BinanceKlineData = JSON.parse(event.data)
            const uiData:BinanceKlineInfo = {
                time: Math.floor(Number(dataFromBinance.k.t) / 1000) as UTCTimestamp,
                open: parseFloat(dataFromBinance.k.o),
                high : parseFloat(dataFromBinance.k.h),
                low: parseFloat(dataFromBinance.k.l),
                close: parseFloat(dataFromBinance.k.c),
            }
            setState({status: "success", data: uiData, isClose: dataFromBinance.k.x})
        }
        wss.onclose = () => {
            console.log(`onclose fired for ${interval}, intentionallyClosed=${intentionallyClosed}, notFoundDetected=${notFoundDetected}`);
    if (timeoutId) clearTimeout(timeoutId);
    if (!intentionallyClosed && !notFoundDetected) {
        console.log(`scheduling reconnect for ${interval}`);
        scheduleReconnect();
    }
        }
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
    }, [symbol, interval])
return state  
}
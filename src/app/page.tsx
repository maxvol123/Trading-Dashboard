'use client'

import { useEffect, useMemo, useState } from "react";
import { MarketElement } from "./components/marketElement";
import { fetchMultiplePairs } from "./lib/binance";
import type { BinanceTickerInfo } from "./lib/types";

export default function Home() {
  const SYMBOLS = ["BTCUSDT", "LTCUSDT", "ETHUSDT", "ADAUSDT", "XRPUSDT", "BNBUSDT", "LINKUSDT", "TONUSDT", "DOGEUSDT", "OPUSDT"]
  const [initialData, setInitialData] = useState<BinanceTickerInfo[] | null>(null)
  useEffect(()=>{
    async function load() {
      const data = await fetchMultiplePairs()
      setInitialData(data)
    }
    load()
  }, [])
  const initialDataMap = useMemo(()=>{
      if (!initialData) return {}
      const map: Record<string, BinanceTickerInfo> = {}
      initialData?.forEach((item)=>{
        map[item.symbol] = item
      })
      return map
    }, [initialData])
  return (
    <div>
      <div className="flex items-center gap-2 px-2 border border-[#1f2a44] rounded-2xl w-fit"><div className="w-2 h-2 rounded-full bg-green-400 shadow-2xl shadow-green-400"/><p>Live · Binance market data</p></div>
      <h1 className="mt-5 text-4xl">Real-time crypto, <br />
      beautifully simple.</h1>
      <p className="mt-2 mb-5">Live prices, clean candlestick charts, and the pairs that matter — all in one calm, focused dashboard.</p>
      <div className="flex flex-col gap-3 border-[#1f2a44] border py-2 px-4 rounded-2xl">
        <div className="flex justify-between text-[#64748b] "> <p className="basis-24">Symbol</p> <p className="basis-24">Price</p> <p className="basis-24">% Change</p> <p className="basis-24">Volume</p></div>
        {SYMBOLS.map((symbol)=>(
          <MarketElement key={symbol} symbol={symbol} initialData={initialDataMap[symbol]}/>
        ))}
      </div>
    </div>
  );
}

'use client'

import { MarketElement } from "./components/marketElement";
import { SearchBar } from "./components/searchBar";

export default function Home() {
  const SYMBOLS = ["BTCUSDT", "LTCUSDT", "ETHUSDT", "ADAUSDT", "XRPUSDT", "BNBUSDT", "LINKUSDT", "TONUSDT", "DOGEUSDT", "OPUSDT"]
  return (
    <div>
      <div className="flex items-center gap-2 px-2 border border-gray-200 rounded-2xl w-fit"><div className="w-2 h-2 rounded-full bg-green-400 shadow-2xl shadow-green-400"/><p>Live · Binance market data</p></div>
      <h1 className="mt-5 text-4xl">Real-time crypto, <br />
      beautifully simple.</h1>
      <p className="mt-3">Live prices, clean candlestick charts, and the pairs that matter — all in one calm, focused dashboard.</p>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between"> <p className="basis-24">Symbol</p> <p className="basis-24">Price</p> <p className="basis-24">% Change</p> <p className="basis-24">Volume</p></div>
        {SYMBOLS.map((symbol)=>(
          <MarketElement key={symbol} symbol={symbol}/>
        ))}
      </div>
    </div>
  );
}

'use client'

import { SearchBar } from "./components/searchBar";

export default function Home() {
  
  return (
    <div>
      <div className="backg1 absolute"/>
      <div className="backg2"/>
      <div className="flex items-center gap-2 px-2 border border-gray-200 rounded-2xl w-fit"><div className="w-2 h-2 rounded-full bg-green-400 shadow-2xl shadow-green-400"/><p>Live · Binance market data</p></div>
      <h1>Real-time crypto, <br />
      beautifully simple.</h1>
      <p>Live prices, clean candlestick charts, and the pairs that matter — all in one calm, focused dashboard.</p>
      <SearchBar/>
    </div>
  );
}

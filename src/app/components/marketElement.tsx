'use client'
import { useEffect, useState } from "react";
import { useBinanceTicker } from "../../../hooks/useBinanceTicker";
import Link from "next/link";
interface Props {
    symbol: string
}
  const colorMap = {
    bg: {
      green: 'bg-[#22c55e29]',
      red: 'bg-[#f8717129]',
      black: 'text-black',
    },
    text: {
      green: 'text-[#22c55e]',
      red: 'text-[#f87171]',
      black: 'text-black',
    },
};
export function MarketElement({symbol}: Props) {
  const state = useBinanceTicker(symbol);
  const [color, setColor] = useState<"green" | "red" | "black">("black")
  const [direction, setDirection] = useState<"▲" | "▼" | "-">("-")
    useEffect(() => {
        if (state.status !== "success") return
        const {data} = state
        if (data.priceChangePercent===0) setColor("black") 
          else
        if (data.priceChangePercent>0) {setColor("green"); setDirection("▲")}
          else
        if (data.priceChangePercent<0) {setColor("red"); setDirection("▼")}

      
    }, [state])
    if (state.status === "loading") {
        return <div>Loading {symbol}...</div>
    }
    if (state.status === "error") {
        return <div>{state.message}</div>
    }
    if (state.status === "reconnecting") {
      return <div>Reconnecting, attempt {state.attempt}</div>
    }
    
    const {data} = state


  return (
      <Link className="" href={`/pair/${symbol.toLowerCase()}`}>
        <div className="flex justify-between"> <p className="basis-24">{data.symbol}</p> <p className="basis-24">$ {data.price}</p> <p className={colorMap.bg[color] + " " + colorMap.text[color]+ " " + "rounded px-1 py-0.5 basis-24"}>{direction}{data.priceChangePercent} %</p> <p className="basis-32">$ {data.volume.toFixed(0)}</p></div>
      </Link>
  );
}

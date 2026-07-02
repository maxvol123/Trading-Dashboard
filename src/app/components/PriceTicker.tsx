'use client'
import { useEffect, useState } from "react";
import { useBinanceTicker } from "../../../hooks/useBinanceTicker";
import Link from "next/link";
interface Props {
    symbol: string
}
  const colorMap = {
    green: 'text-green-500',
    red: 'text-red-500',
    black: 'text-black',
};

export function PriceTicker({symbol}: Props) {
  const state = useBinanceTicker(symbol);
  const [textcolor, setColor] = useState<"green" | "red" | "black">("black")

    
    useEffect(() => {
        if (state.status !== "success") return
        const {data} = state
        if (data.priceChangePercent===0) setColor("black") 
          else
        if (data.priceChangePercent>0) setColor("green")
          else
        if (data.priceChangePercent<0) setColor("red")

      
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
        <div className="hover:text-gray-500 flex gap-1">{symbol.toUpperCase()} <span className="mr-1 text-[#64748b] font-medium">{data.price}</span><span className={colorMap[textcolor]}>{data.priceChangePercent}%</span></div>
      </Link>
  );
}

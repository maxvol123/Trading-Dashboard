'use client'
import { useEffect, useRef, useState } from "react";
import { useBinanceTicker } from "../hooks/useBinanceTicker";
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
  const previousPrice = useRef<number | null>(null)
  const state = useBinanceTicker(symbol);
  const [textcolor, setColor] = useState<"green" | "red" | "black">("black")

    
    useEffect(() => {
        if (state.status !== "success") return
        const {data} = state
      if (previousPrice.current !== null) {
        if (data.price>previousPrice.current) setColor("green")
        else if (data.price<previousPrice.current) setColor("red")
      }
      previousPrice.current = data.price; 
      
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
        <div className="hover:text-gray-500">{symbol} <span className={colorMap[textcolor]}>{data.price}</span></div>
      </Link>
  );
}

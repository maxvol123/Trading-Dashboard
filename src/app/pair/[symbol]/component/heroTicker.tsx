'use client'
import { useEffect, useMemo, useState} from "react";
import { useBinanceTicker } from "../../../../../hooks/useBinanceTicker";
import type { BinanceTickerInfo } from "@/app/lib/types";
import { fetchSymbol } from "@/app/lib/binance";
interface Props {
    symbol: string,
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
export function HeroTicker({ symbol }: Props) {
    const state = useBinanceTicker(symbol);
    const [data, setData] = useState<BinanceTickerInfo | null>(null)
    const {color, direction} = useMemo(()=>{
      if (!data || data.priceChangePercent === 0) return {color: "black" as const, direction: "-" as const}
      if (data.priceChangePercent>0) return {color: "green" as const, direction: "▲" as const}
      else return {color: "red" as const, direction: "▼" as const}
    }, [data])
    useEffect(()=>{
        async function load() {
          const data = await fetchSymbol(symbol)
          setData(data)
        }
        load()
        
      }, [])
      useEffect(()=>{
        if (state.status === "success") {
            setData(state.data)
        }
      }, [state])
      
    
    return (
        <div className="flex flex-row">
                <p className="w-36 text-2xl font-semibold">$ {data?.price}</p>
                <p className={`${colorMap.bg[color]} ${colorMap.text[color]} rounded px-1 py-0.5 basis-24 text-center`}>
                    {direction}  {data?.priceChangePercent.toFixed(2)} %
                </p>
        </div>
    );
}
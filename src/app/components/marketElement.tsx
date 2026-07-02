'use client'
import { useMemo} from "react";
import { useBinanceTicker } from "../../../hooks/useBinanceTicker";
import Link from "next/link";
import type { BinanceTickerInfo } from "../lib/types";
interface Props {
    symbol: string,
    initialData: BinanceTickerInfo | undefined
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
export function MarketElement({ symbol, initialData }: Props) {
    const state = useBinanceTicker(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
    const data = state.status === "success" ? state.data : initialData;
    const {color, direction} = useMemo(()=>{
      if (!data || data.priceChangePercent === 0) return {color: "black" as const, direction: "-" as const}
      if (data.priceChangePercent>0) return {color: "green" as const, direction: "▲" as const}
      else return {color: "red" as const, direction: "▼" as const}
    }, [data])
    
    if (!data) return null;
    if (state.status === "error") return <div>{state.message}</div>;
    if (state.status === "reconnecting" && !initialData) {
        return <div>Reconnecting...</div>;
    }
    
    return (
        <Link href={`/pair/${symbol.toLowerCase()}`}>
            <div className="flex justify-between border-b border-[#1f2a44] py-2">
                <p className="basis-24">{symbol}</p>
                <p className="basis-24">$ {data.price}</p>
                <p className={`${colorMap.bg[color]} ${colorMap.text[color]} rounded px-1 py-0.5 basis-24 text-center`}>
                    {direction}{data.priceChangePercent.toFixed(2)} %
                </p>
                <p className="basis-32">$ {data.volume.toFixed(0)}</p>
            </div>
        </Link>
    );
}
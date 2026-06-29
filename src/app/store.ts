import { create } from "zustand";
import { BinanceTickerInfo } from "./lib/types";
interface MarketStore {
    allTickers: Record<string, BinanceTickerInfo>;
    isLoading: boolean;
    setAllTickers: (data: BinanceTickerInfo[]) => void;
    updateTicker: (data: BinanceTickerInfo) => void;
}

const useAllSymbols = create<MarketStore>((set)=>({
    allTickers: {},
    isLoading: true,
    setAllTickers: (data) => set(() => {
        const map: Record<string, BinanceTickerInfo> = {};
        data.forEach(item => {
            map[item.symbol] = item;
        });
        return { 
            allTickers: map,
            isLoading: false,
        };
    }),
    updateTicker: (data) => set((state) => ({
        allTickers: {
            ...state.allTickers,
            [data.symbol]: data,
        },
    })),
}))
'use client'
import Link from "next/link"
import { SearchBar } from "./searchBar"
import { PriceTicker } from "@/app/components/priceTicker"

interface Props {
    symbolList: string[]
}
export default function ({ symbolList}: Props) {
   return( 
    <header>
        <div className="py-3 px-4 flex flex-row items-center">
            <Link href="/" className="flex flex-row">
            <div className="logo"><div className=""></div></div>
            <h2 className="ml-4 font-bold text-[20px]">Trading Dashboard</h2>
            </Link>
            <div className="ml-10">
                <SearchBar placeholder="Search markets…"/>
            </div>
        </div>
        <div className="flex justify-around flex-row gap-5 py-2 px-1 border-b border-t border-[#1f2a44] mb-5 bg-[#0d1426]"> 
            {symbolList.map((symbol) => (
                <div key={symbol} className="min-w-62.5"> 
                <PriceTicker symbol={symbol}/>
                </div>
            ))}
        </div>
    </header>
    )
}
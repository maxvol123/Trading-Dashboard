import { useEffect, useState } from "react";
import { fetchBinanceTokenList } from "../../../hooks/fetchBinanceTokenList";
import Link from "next/link";

interface Props {
    placeholder: string
}
export function SearchBar({placeholder}: Props) {
    const [tokenList, setTokenList] = useState<string[] | null>([])
    const [query, setQuery] = useState<string>("")
    const [menuStatus, setMenuStatus] = useState<"none" | "absolute">("none")

    useEffect(() => {
        fetchBinanceTokenList().then(symbols => {
            if (symbols) setTokenList(symbols);
        });
    }, []);
            const filteredSymbols = query
    ? [
        ...tokenList?.filter(s => s.toLowerCase().startsWith(query.toLowerCase())) ?? [],
        ...tokenList?.filter(s => !s.toLowerCase().startsWith(query.toLowerCase()) && s.toLowerCase().includes(query.toLowerCase())) ?? [],
    ].slice(0, 5)
    : [];
    return(
        <div className="max-w-28">
            <input onClick={()=>setMenuStatus("absolute")} className="min-w-64 px-3 py-2 rounded border border-[#27344f] text-[#64748b] bg-[#0b1120]" type="text" name="Search Symbol" id="" placeholder={placeholder} onChange={(e) => setQuery(e.target.value)}/>
            <div className={"flex flex-col gap-2 bg-[#0d1426] min-w-64 px-2 h-fit absolute "}>{
                (query) === "" ? (<div></div>):(
            filteredSymbols?.map((symbol)=>(<div key={symbol} className="border-b border-b-blue-950 py-2"><Link href={"/pair/"+symbol.toLowerCase()} className="px-2">{symbol}</Link></div>))
            )   
            
            }</div>
        </div>
    )
}
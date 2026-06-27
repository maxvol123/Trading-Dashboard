import { useEffect, useState } from "react";
import { fetchBinanceTokenList } from "../../../hooks/fetchBinanceTokenList";

export function SearchBar() {
    const [tokenList, setTokenList] = useState<string[] | null>([])
    const [query, setQuery] = useState<string>("")

    useEffect(() => {
        fetchBinanceTokenList().then(symbols => {
            if (symbols) setTokenList(symbols);
        });
    }, []);
            const filteredSymbols = query
    ? [
        ...tokenList?.filter(s => s.toLowerCase().startsWith(query.toLowerCase())) ?? [],
        ...tokenList?.filter(s => !s.toLowerCase().startsWith(query.toLowerCase()) && s.toLowerCase().includes(query.toLowerCase())) ?? [],
    ].slice(0, 10)
    : [];
    return(
        <div className="">
            <input type="text" name="Search Symbol" id="" placeholder="Search a pair — e.g. BTCUSDT" onChange={(e) => setQuery(e.target.value)}/>
            <div className="">{
                (query) === "" ? (<div></div>):(

            filteredSymbols?.map((symbol)=>(<div key={symbol}>{symbol}</div>))
            )
            
            }</div>
        </div>
    )
}
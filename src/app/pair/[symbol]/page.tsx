import {fetchCandles } from "../../lib/binance";
import PairChart from "@/app/components/pairChart";

interface PageProps {
    params: Promise<{ symbol: string }>;
}
export default async function PairPage({ params }: PageProps) {
    const { symbol } = await params;
    const candles = await fetchCandles(symbol.toUpperCase(), "1h", 200);
    if (!candles) {
        return <div>Failed to load {symbol}</div>
    }
    return (
        <main className="container mx-auto p-8">

            <h1 className="text-3xl font-bold mb-6">{symbol}</h1>
            <p>Detail page for {symbol}</p>
            <PairChart initialCandles={candles} symbol={symbol} />
        </main>
    );
}
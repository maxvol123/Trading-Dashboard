'use client'
import { PriceTicker } from "../../components/PriceTicker";
export default function Home() {
  const TokensArr = ["BTCUSDT", "ETHUSDT", "DOGEUSDT", "BTCUSDF"]

  return (
    <div>
          <h1>Trading Dashboard</h1>
      {TokensArr.map((symbol) => (
        <PriceTicker key={symbol} symbol={symbol}/>
      ))}
    </div>
  );
}

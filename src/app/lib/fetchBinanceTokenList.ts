// https://data-api.binance.vision/api/v3/exchangeInfo
interface SymbolInfo {
    symbol: string;
    status: string;
    baseAsset: string;
    quoteAsset: string;
}

interface ExchangeInfoResponse {
    symbols: SymbolInfo[];
}

export async function fetchBinanceTokenList():Promise<string[] | null> {
    try {
        const response = await fetch("https://data-api.binance.vision/api/v3/exchangeInfo")
        if (!response.ok) return null
        const data:ExchangeInfoResponse = await response.json()
        return data.symbols
            .filter(s => s.status === 'TRADING')
            .map(s => s.symbol);
    } catch (error) {
        console.error(error)
        return null
    }
    
}
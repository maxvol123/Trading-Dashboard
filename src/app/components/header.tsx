import { PriceTicker } from "../../../components/PriceTicker"

interface Props {
    navElements: NavElement[],
    symbolList: string[]
}
type NavElement = Logo | StringElement | Button
type Logo = {
    image: string,
    url: string
}
type StringElement = {
    title: string,
    url: string
}
type Button = {
    title: string,
    bgColor: "#2563eb" | "#eff6ff"
    url: string
}
export default function ({navElements, symbolList}: Props) {
   return( 
    <div className="flex justify-around  py-2 px-1 border-b border-gray-200 mb-5"> 
        {symbolList.map((symbol) => (
            <div key={symbol} className="w-60"> 
            <PriceTicker symbol={symbol}/>
            </div>
        ))}
    </div>
    )
}
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import { TokensArr } from "./options";
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: "Trading Dashboard",
  description: "Data From Binance",
};
const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased d-none`}
    >
      <body className="min-h-full flex flex-col bg-[#0b1120] font-manrope text-white">
        <Header symbolList={TokensArr}/>
        <div className="px-12">
        {children}
        </div></body>
    </html>
  );
}

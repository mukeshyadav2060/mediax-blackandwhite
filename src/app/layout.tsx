import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Free stand-in for the tall condensed display face used on the reference site
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Crypto PR & Web3 Press Release Distribution | MediaX",
  description:
    "Boost your crypto brand with MediaX. Guaranteed press release distribution to outlets like Cointelegraph and Yahoo Finance. Trusted by 1,400+ Web3 projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Crypto PR & Web3 Press Release Distribution | MediaX",
  description:
    "Boost your crypto brand with MediaX. Guaranteed press release distribution to outlets like Cointelegraph, The Block and Business Insider. Packages from $600. Trusted by 1,400+ Web3 projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

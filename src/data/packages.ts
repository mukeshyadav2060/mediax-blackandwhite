/* Package content, modelled on the Chainwire pricing page (https://chainwire.org/pricing/).
   These are that site's plans, prices and claims — swap in MediaX's real terms before launch. */
export type Pkg = {
  id: string; name: string; price: number; was?: number; badge?: string;
  tagline: string;
  stats: [{ n: number; suf: string; l: string }, { n: number; suf: string; l: string }];
  distribution: string[];
  top?: string[];        // outlets named in the plan graphic
  extras: string[];
  highlights: string[];
  best: string;                                   // "Best for…" line
  outlets: { name: string; tag: "Crypto" | "Finance"; logo?: string }[]; // sample of where it is published
  outletCount: string;
};

const base = ["Same-day distribution", "Editorial suggestions", "Customer support", "SEO adjustments"];
const globalUp = "Optional upgrade: Global distribution (translation included)";

export const packages: Pkg[] = [
  {
    id: "lite", name: "Lite", price: 1399, tagline: "8 guaranteed published articles",
    stats: [{ n: 8, suf: "", l: "guaranteed articles" }, { n: 8, suf: "", l: "crypto news outlets" }],
    distribution: ["Distribution to 8 crypto news outlets", "Featured on the homepage of all news outlets", "Same-day distribution"],
    extras: ["Editorial suggestions", "Customer support", "SEO adjustments", "Up to 1 image", "Up to 1 embedded video", globalUp, "Google News logo"],
    highlights: base,
    best: "Best for first announcements and project updates.",
    outlets: [{ name: "The Defiant", tag: "Crypto", logo: "/media/outlet-the-defiant.webp" }, { name: "Investing.com", tag: "Finance", logo: "/media/outlet-investing-com.webp" }, { name: "Hackernoon", tag: "Crypto", logo: "/media/outlet-hackernoon.webp" }],
    outletCount: "8 crypto outlets",
  },
  {
    id: "standard", name: "Standard", price: 2499, was: 2799, tagline: "20 guaranteed published articles",
    stats: [{ n: 20, suf: "", l: "guaranteed articles" }, { n: 20, suf: "", l: "crypto news outlets" }],
    distribution: ["Distribution to 20 crypto news outlets", "Featured on the homepage of all news outlets", "Same-day distribution"],
    extras: ["Editorial suggestions", "Customer support", "SEO adjustments", "Up to 2 images", "Up to 1 embedded video", globalUp, "Google News logo"],
    highlights: base,
    best: "Best for launches, listings and partnerships.",
    outlets: [{ name: "Be[in]crypto", tag: "Crypto", logo: "/media/outlet-be-in-crypto.webp" }, { name: "Crypto.news", tag: "Crypto", logo: "/media/outlet-crypto-news.webp" }, { name: "U.Today", tag: "Crypto", logo: "/media/outlet-u-today.webp" }, { name: "CryptoBriefing", tag: "Crypto", logo: "/media/outlet-cryptobriefing.webp" }],
    outletCount: "20 crypto outlets",
  },
  {
    id: "premium", name: "Premium", price: 6499, was: 7699, badge: "Popular", tagline: "75 guaranteed top crypto articles · 500+ mainstream articles",
    stats: [{ n: 75, suf: "", l: "top crypto articles" }, { n: 500, suf: "+", l: "mainstream articles" }],
    distribution: ["Guaranteed distribution to top crypto news outlets", "Distribution to 75+ crypto news outlets", "Featured on the homepage of all crypto news outlets", "Guaranteed extra distribution to major news outlets", "Same-day distribution"],
    top: ["Decrypt", "Investing.com", "CoinMarketCap"],
    extras: ["Editorial suggestions", "Customer support", "SEO adjustments", "Up to 2 images", "Up to 1 embedded video", globalUp, "Google News logo"],
    highlights: base,
    best: "Best for funding rounds and major launches.",
    outlets: [{ name: "Decrypt", tag: "Crypto", logo: "/media/outlet-decrypt.webp" }, { name: "CoinMarketCap", tag: "Crypto", logo: "/media/outlet-coinmarketcap.webp" }, { name: "Investing.com", tag: "Finance", logo: "/media/outlet-investing-com.webp" }],
    outletCount: "75+ crypto outlets",
  },
  {
    id: "gold", name: "Gold", price: 10799, was: 17799, badge: "Best value", tagline: "100+ guaranteed top crypto articles · 500+ mainstream articles",
    stats: [{ n: 100, suf: "+", l: "top crypto articles" }, { n: 500, suf: "+", l: "mainstream articles" }],
    distribution: ["Guaranteed distribution to top crypto news outlets", "Distribution to trading terminals", "Distribution to 100+ crypto news outlets", "Featured on the homepage of all crypto news outlets", "Guaranteed extra distribution to major news outlets", "Same-day distribution"],
    top: ["The Block", "Be[in]Crypto", "Bitcoin.com", "Decrypt", "Investing.com", "CoinMarketCap"],
    extras: ["Editorial suggestions", "Customer support", "SEO adjustments", "Up to 2 images", "Up to 1 embedded video", globalUp, "Google News logo"],
    highlights: base,
    best: "Best for flagship news that needs maximum reach.",
    outlets: [{ name: "The Block", tag: "Crypto", logo: "/media/outlet-the-block.webp" }, { name: "Investing.com", tag: "Finance", logo: "/media/outlet-investing-com.webp" }, { name: "Bitcoin.com", tag: "Crypto", logo: "/media/outlet-news-bitcoin-com.webp" }],
    outletCount: "100+ crypto outlets",
  },
];

/* rows for the comparison table: label + one value per package (same order as `packages`) */
export const compareRows: [string, string[]][] = [
  ["Price", packages.map((p) => "$" + p.price.toLocaleString("en-US"))],
  ["Guaranteed articles", ["8", "20", "75 top crypto", "100+ top crypto"]],
  ["Crypto news outlets", ["8", "20", "75+", "100+"]],
  ["Mainstream articles", ["—", "—", "500+", "500+"]],
  ["Top-outlet guarantee", ["—", "—", "✓", "✓"]],
  ["Trading terminals", ["—", "—", "—", "✓"]],
  ["Homepage feature", ["✓", "✓", "✓", "✓"]],
  ["Same-day distribution", ["✓", "✓", "✓", "✓"]],
  ["Editorial suggestions", ["✓", "✓", "✓", "✓"]],
  ["Customer support", ["✓", "✓", "✓", "✓"]],
  ["SEO adjustments", ["✓", "✓", "✓", "✓"]],
  ["Images", ["Up to 1", "Up to 2", "Up to 2", "Up to 2"]],
  ["Embedded video", ["Up to 1", "Up to 1", "Up to 1", "Up to 1"]],
  ["Google News logo", ["✓", "✓", "✓", "✓"]],
  ["Global distribution", ["Add-on", "Add-on", "Add-on", "Add-on"]],
];

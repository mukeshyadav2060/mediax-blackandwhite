/* MediaX packages. Prices, guaranteed-publication counts and outlet lists come from
   plans.json (mirrors the live MediaX CMS). Card copy — "best for" lines and the
   headline outlets shown on each card — lives here. */
import data from "./plans.json";

export type Pkg = {
  id: string; name: string; price: number; was?: number; badge?: string;
  tagline: string;
  stats: [{ n: number; suf: string; l: string }, { n: number; suf: string; l: string }];
  highlights: string[];
  best: string;                                   // "Best for…" line
  outlets: { name: string; tag: "Crypto" | "Finance"; logo?: string }[]; // headline outlets shown on the card
  outletCount: string;
};

type Card = { best: string; outlets: [string, "Crypto" | "Finance"][] };

const CARDS: Record<string, Card> = {
  lite:     { best: "Best for first announcements that need mainstream credibility.",
              outlets: [["business-insider", "Finance"], ["apnews", "Finance"], ["marketwatch", "Finance"], ["coinmarketcap", "Crypto"]] },
  starter:  { best: "Best for launches, listings and partnerships.",
              outlets: [["investing-com", "Finance"], ["the-defiant", "Crypto"], ["bitcoinist", "Crypto"], ["hackernoon", "Crypto"]] },
  gold:     { best: "Best for funding rounds and major launches.",
              outlets: [["news-bitcoin-com", "Crypto"], ["be-in-crypto", "Crypto"], ["u-today", "Crypto"], ["business-insider", "Finance"]] },
  platinum: { best: "Best for news that needs tier-1 crypto coverage.",
              outlets: [["the-block", "Crypto"], ["decrypt", "Crypto"], ["news-bitcoin-com", "Crypto"], ["marketwatch", "Finance"]] },
  diamond:  { best: "Best for flagship news, with Cointelegraph included.",
              outlets: [["cointelegraph", "Crypto"], ["news-bitcoin-com", "Crypto"], ["newsbtc", "Crypto"], ["business-insider", "Finance"]] },
};

const highlights = ["Editorial assistance", "SEO optimization", "1–2 images", "Metric reports"];
const pub = (id: string) => data.publishers.find((p) => p.id === id);

export const packages: Pkg[] = data.plans.map((plan) => {
  const guaranteed = parseInt(plan.publications, 10);   // "550+ Guaranteed Publications" → 550
  const named = plan.publishers.length;
  const card = CARDS[plan.id];
  return {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    tagline: `${guaranteed}+ guaranteed publications · ${named} named outlets`,
    stats: [{ n: guaranteed, suf: "+", l: "guaranteed publications" }, { n: named, suf: "", l: "named premium outlets" }],
    highlights,
    best: card.best,
    outlets: card.outlets.map(([id, tag]) => ({ name: pub(id)?.name ?? id, tag, logo: pub(id)?.logo.src })),
    outletCount: `${named} named outlets`,
  };
});

/* rows for the comparison table: label + one value per package (same order as `packages`) */
const all = (v: string) => packages.map(() => v);
export const compareRows: [string, string[]][] = [
  ["Price", packages.map((p) => "$" + p.price.toLocaleString("en-US"))],
  ["Guaranteed publications", packages.map((p) => `${p.stats[0].n}+`)],
  ["Named premium outlets", packages.map((p) => String(p.stats[1].n))],
  ["Headline outlets", packages.map((p) => p.outlets.slice(0, 2).map((o) => o.name).join(", "))],
  ["Time to go live", all("24–48 hours")],
  ["Editorial assistance", all("✓")],
  ["SEO optimization", all("✓")],
  ["Images", all("1–2")],
  ["Metric report", all("✓")],
];

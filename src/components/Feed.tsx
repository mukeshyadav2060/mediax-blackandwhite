"use client";
import { useMemo, useState } from "react";
import data from "@/data/plans.json";
import { testimonials } from "@/data/content";
import { articles } from "@/data/pages";

type Kind = "client" | "guide" | "outlet" | "stat";
type Item =
  | { kind: "client"; name: string; role: string; img: string; quote: string }
  | { kind: "guide"; slug: string; title: string; tag: string; read: string }
  | { kind: "outlet"; name: string; logo: string; type: string }
  | { kind: "stat"; value: string; label: string; href: string; cta: string };

const clean = (q: string) => q.replace(/^“|”$/g, "");
const pub = (id: string) => data.publishers.find((p) => p.id === id)!;
const MAIN = new Set(["business-insider", "apnews", "benzinga", "marketwatch", "investing-com", "morningstar", "invezz"]);

const clients: Item[] = testimonials.map((t) => ({ kind: "client", name: t.name, role: t.role, img: t.img, quote: clean(t.quote) }));
const guides: Item[] = Object.entries(articles).map(([slug, a]) => ({ kind: "guide", slug, title: a.title, tag: a.tag, read: a.read }));
const outlets: Item[] = ["cointelegraph", "decrypt", "the-block", "coinmarketcap", "benzinga", "investing-com"].map((id) => ({
  kind: "outlet", name: pub(id).name, logo: pub(id).logo.src, type: MAIN.has(id) ? "Finance & mainstream" : "Crypto & Web3",
}));
const stats: Item[] = [
  { kind: "stat", value: "1,400+", label: "crypto and Web3 projects have trusted MediaX", href: "/about", cta: "About MediaX" },
  { kind: "stat", value: `${data.publishers.length}`, label: "publishers in our distribution network", href: "/publications", cta: "See the network" },
];

// one running stream: client voices, guides, outlets and numbers interleaved
const stream: Item[] = [
  clients[0], guides[0], outlets[0], stats[0], clients[1], outlets[1], guides[1], clients[2],
  outlets[2], stats[1], clients[3], guides[2], outlets[3], clients[4], outlets[4], outlets[5],
];

const FILTERS: [string, Kind | "all"][] = [["All", "all"], ["Clients", "client"], ["Guides", "guide"], ["Outlets", "outlet"]];
const TAG: Record<Kind, string> = { client: "Client story", guide: "Guide", outlet: "Network", stat: "By the numbers" };

export default function Feed() {
  const [f, setF] = useState<Kind | "all">("all");
  const list = useMemo(() => stream.filter((i) => f === "all" || i.kind === f || (f === "outlet" && i.kind === "stat")), [f]);
  const count = (k: Kind | "all") => (k === "all" ? stream.length : stream.filter((i) => i.kind === k || (k === "outlet" && i.kind === "stat")).length);

  return (
    <div className="fd">
      <div className="fd-bar" role="tablist" aria-label="Filter the feed">
        {FILTERS.map(([l, k]) => (
          <button key={k} role="tab" aria-selected={f === k} className={f === k ? "on" : ""} onClick={() => setF(k)}>
            {l}<sup>{count(k)}</sup>
          </button>
        ))}
      </div>

      <div className="fd-grid" key={f}>
        {list.map((it, i) => {
          const style = { animationDelay: `${i * 45}ms` };
          if (it.kind === "client") return (
            <article className="fd-card client" style={style} key={`c-${it.name}`}>
              <p className="fd-tag">{TAG.client}</p>
              <blockquote>“{it.quote}”</blockquote>
              <footer>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/${it.img}.webp`} alt="" width={40} height={40} />
                <div><b>{it.name}</b><span>{it.role}</span></div>
              </footer>
            </article>
          );
          if (it.kind === "guide") return (
            <a className="fd-card guide" style={style} href={`/blogs/${it.slug}`} key={`g-${it.slug}`}>
              <p className="fd-tag">{TAG.guide} · {it.tag}</p>
              <h3>{it.title}</h3>
              <p className="fd-meta"><span>{it.read}</span><i aria-hidden>↗</i></p>
            </a>
          );
          if (it.kind === "outlet") return (
            <div className="fd-card outlet" style={style} key={`o-${it.name}`}>
              <p className="fd-tag">{TAG.outlet}</p>
              <div className="fd-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={it.logo} alt="" /></div>
              <h3>{it.name}</h3>
              <p className="fd-meta"><span>{it.type}</span></p>
            </div>
          );
          return (
            <a className="fd-card stat" style={style} href={it.href} key={`s-${it.value}`}>
              <p className="fd-tag">{TAG.stat}</p>
              <b>{it.value}</b>
              <p>{it.label}</p>
              <p className="fd-meta"><span>{it.cta}</span><i aria-hidden>→</i></p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

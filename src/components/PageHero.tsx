import { Reveal, Split } from "./Motion";
import { packages } from "@/data/packages";
import { proof } from "@/data/content";
import plans from "@/data/plans.json";

export type HeroAside = "outlets" | "pricing" | "stats" | "contact" | "none";

const CAL = "https://calendly.com/mediaxagency/30min";
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const logo = (id: string) => plans.publishers.find((p) => p.id === id)!.logo.src;

/* floating outlet tiles, same motif as the home hero: [id, x%, y%, rotation, bob delay] */
const TILES: [string, number, number, number, number][] = [
  ["cointelegraph", 14, 8, -6, 0], ["the-block", 58, 0, 4, 1.2], ["business-insider", 34, 36, -2, 2.4],
  ["decrypt", 78, 40, 7, .6], ["apnews", 6, 62, 5, 1.8], ["coinmarketcap", 54, 72, -5, 3],
];

function Aside({ kind }: { kind: HeroAside }) {
  if (kind === "pricing") return (
    <div className="ph-card ph-price">
      <p className="ph-lab"><span>Packages</span><span>One-off, per release</span></p>
      <ul>
        {packages.map((p) => (
          <li key={p.id}>
            <a href={`/submit-press-release?package=${p.id}`}>
              <b>{p.name}</b>
              <span>{p.stats[0].n}{p.stats[0].suf} publications</span>
              <em>{fmt(p.price)}</em>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  if (kind === "stats") return (
    <div className="ph-card ph-ink ph-stats">
      <p className="ph-lab"><span>MediaX in numbers</span></p>
      <dl>{proof.map(([n, pre, suf, l]) => <div key={l}><dt>{pre}{n.toLocaleString("en-US")}{suf}</dt><dd>{l}</dd></div>)}</dl>
    </div>
  );
  if (kind === "contact") return (
    <div className="ph-card ph-ink ph-contact">
      <p className="ph-lab"><span><i className="ph-dot" aria-hidden />Replies within 24 hours</span></p>
      <ul>
        <li><a href="mailto:contact@mediax.agency"><span>Email</span><b>contact@mediax.agency</b></a></li>
        <li><a href="https://t.me/MediaxPR"><span>Telegram</span><b>@MediaxPR</b></a></li>
        <li><a href={CAL}><span>Call</span><b>Book 30 minutes</b></a></li>
      </ul>
      <a className="ph-verify" href="/verify-team">Got a message from “MediaX”? Verify it’s us →</a>
    </div>
  );
  if (kind === "outlets") return (
    <div className="ph-tiles" aria-hidden>
      {TILES.map(([id, x, y, r, d]) => (
        <div className="ph-tile" key={id} style={{ left: `${x}%`, top: `${y}%`, ["--r" as string]: `${r}deg`, animationDelay: `${-d}s` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo(id)} alt="" />
        </div>
      ))}
      <span className="ph-cur" style={{ left: "44%", top: "26%" }}><svg width="16" height="18" viewBox="0 0 18 20"><path d="M1 1l6.5 17 2.4-7.1L17 8.5z" fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg><b>Editor</b></span>
      <span className="ph-cur" style={{ left: "24%", top: "56%" }}><svg width="16" height="18" viewBox="0 0 18 20"><path d="M1 1l6.5 17 2.4-7.1L17 8.5z" fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg><b>PR Strategist</b></span>
    </div>
  );
  return null;
}

/* "Home / Section" trail, shared by every inner-page hero */
export function Crumbs({ current, trail = [["Home", "/"]] }: { current: string; trail?: [string, string][] }) {
  return (
    <Reveal as="nav" className="ph-crumbs">
      {trail.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
      <span aria-current="page">{current}</span>
    </Reveal>
  );
}

/* inner-page hero: home-hero grid backdrop, breadcrumb, headline + actions, and a
   page-specific visual on the right */
export default function PageHero({ eyebrow, title, lead, cta, aside = "none", crumbs }: {
  eyebrow: string; title: string; lead?: string; cta?: [string, string][]; aside?: HeroAside; crumbs?: [string, string][];
}) {
  return (
    <section className={`phero ph2 ${aside === "none" ? "solo" : ""}`}>
      <div className="ph-grid" aria-hidden />
      <div className="wrap ph-in">
        <div className="ph-main">
          <Crumbs current={eyebrow} trail={crumbs} />
          <Split as="h1" className="display h-xl" text={title} />
          {lead && <Reveal as="p" className="lead">{lead}</Reveal>}
          {cta && <Reveal className="btn-row">{cta.map(([l, h], i) => <a key={l} href={h} className={i ? "btn glass" : "btn ink"}>{l}</a>)}</Reveal>}
        </div>
        {aside !== "none" && <Reveal className="ph-aside" delay={200}><Aside kind={aside} /></Reveal>}
      </div>
    </section>
  );
}

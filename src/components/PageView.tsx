import Header from "./Header";
import Footer from "./Footer";
import Faq from "./Faq";
import Pricing from "./Pricing";
import ContactForm from "./ContactForm";
import VerifyForm from "./VerifyForm";
import Feed from "./Feed";
import { Reveal, SmoothScroll, Split } from "./Motion";
import PageHero, { type HeroAside } from "./PageHero";
import { AboutHero, BlogHero, ContactHero, PricingHero, PublicationsHero } from "./PageHeroes";

/* pages with a hero of their own; the rest share <PageHero> */
const HEROES: Record<string, (p: { page: Page }) => React.ReactNode> = {
  pricing: PricingHero, publications: PublicationsHero, about: AboutHero, contact: ContactHero, blogs: BlogHero,
};
import data from "@/data/plans.json";
import { compareRows, packages } from "@/data/packages";
import { posts, resourceTags, steps, testimonials } from "@/data/content";
import { articles, type Page, type Sec } from "@/data/pages";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const A = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => <a href={href} className={className}>{children}</a>;

function Compare() {
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <thead><tr><th />{packages.map((p) => <th key={p.id}>{p.name}</th>)}</tr></thead>
        <tbody>{compareRows.map(([l, vals]) => <tr key={l}><th>{l}</th>{vals.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
        <tfoot><tr><th />{packages.map((p) => <td key={p.id}><A className="btn purple sm" href={`/submit-press-release?package=${p.id}`}>Choose</A></td>)}</tr></tfoot>
      </table>
    </div>
  );
}

function Logos({ limit, names }: { limit?: number; names?: boolean }) {
  const list = limit ? data.publishers.slice(0, limit) : data.publishers;
  return (
    <div className={names ? "pub-grid named" : "pub-grid"}>
      {list.map((p) => (
        <div className="pub" key={p.id}>
          <div className="tile">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.logo.src} alt={p.name} loading="lazy" /></div>
          {names && <span>{p.name}</span>}
        </div>
      ))}
    </div>
  );
}

function Block({ s }: { s: Sec }) {
  switch (s.k) {
    case "cards": return (<>
      <Split as="h2" className="display h-m" text={s.title} />
      <div className="cards">{s.items.map((it, i) => (
        <Reveal key={it.t} delay={i * 70}>
          {(it.href ? A : (({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>))({ href: it.href ?? "", className: "ci", children: <><span className="n">{String(i + 1).padStart(2, "0")}</span><h3>{it.t}</h3><p>{it.b}</p>{it.href && <span className="go">↗</span>}</> })}
        </Reveal>
      ))}</div>
    </>);
    case "rows": return (<>
      <Split as="h2" className="display h-m" text={s.title} />
      <div className="rowsl">{s.items.map((it, i) => <Reveal className="row" key={it.t} delay={i * 70}><span className="n">{String(i + 1).padStart(2, "0")}</span><div><h3>{it.t}</h3><p>{it.b}</p></div></Reveal>)}</div>
    </>);
    case "stats": return <div className="statrow">{s.items.map(([n, l]) => <Reveal key={l}><b className="display">{n}</b><span>{l}</span></Reveal>)}</div>;
    case "text": return (<>
      {s.title && <Split as="h2" className="display h-m" text={s.title} />}
      <div className="prose">{s.paras.map((p) => <Reveal as="p" key={p}>{p}</Reveal>)}</div>
    </>);
    case "steps": return (<>
      <Split as="h2" className="display h-m" text={"How it **works**"} />
      <div className="stepgrid">{steps.map((st, i) => (
        <Reveal className="stp" key={st.n} delay={i * 70}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/media/${st.img}.webp`} alt="" loading="lazy" /><span className="n">0{st.n}</span><h3>{st.title}</h3><p>{st.body}</p>
        </Reveal>
      ))}</div>
    </>);
    case "quotes": return (<>
      <Split as="h2" className="display h-m" text={"What our **clients say**"} />
      <div className="qgrid">{testimonials.map((t, i) => (
        <Reveal className="qc" key={t.name} delay={i * 60}>
          <p>“{t.quote.replace(/^“|”$/g, "")}”</p>
          <footer>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/media/${t.img}.webp`} alt="" /><div><b>{t.name}</b><span>{t.role}</span></div></footer>
        </Reveal>
      ))}</div>
    </>);
    case "outlets": return (<>
      <Split as="h2" className="display h-m" text={"Where you’ll be **published**"} />
      <Logos limit={18} />
      <p className="more"><A href="/publications" className="btn dark-outline">See the full network</A></p>
    </>);
    case "publishers": return <Logos names />;
    case "faq": return (<>
      <Split as="h2" className="display h-m" text={"Questions, **answered**"} /><Faq />
    </>);
    case "pricing": return <div className="dkpad"><Pricing /></div>;
    case "compare": return (<><Split as="h2" className="display h-m" text={"Compare **every package**"} /><Compare /></>);
    case "feed": return <Feed />;
    case "contact": return <ContactForm />;
    case "verify": return <VerifyForm />;
    case "posts": return (
      <div className="posts">{posts.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}><A className="post" href={p.href}><span className="tag">{articles[p.href.split("/").pop()!]?.tag ?? resourceTags[i]}</span><h3 className="display">{p.title}</h3><span className="go">↗</span></A></Reveal>
      ))}</div>
    );
  }
}

const darkSec = (s: Sec) => (s.k === "cards" && s.dark) || s.k === "pricing";

/* which visual sits beside each inner page's headline */
function asideFor(k: string): HeroAside {
  if (k === "pricing") return "pricing";
  if (["about", "team", "best-crypto-pr-agency", "newsroom"].includes(k)) return "stats";
  if (["faq", "verify-team"].includes(k)) return "contact"; // /contact already has these channels beside its form
  if (["privacy", "terms-condition"].includes(k)) return "none";
  return "outlets"; // service, sector, publication and resource pages
}

export default function PageView({ page, k = "" }: { page: Page; k?: string }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        {HEROES[k] ? HEROES[k]({ page }) : <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} cta={page.cta} aside={asideFor(k)} />}
        {page.secs.map((s, i) => {
          const dk = darkSec(s);
          return <section key={i} id={s.k} className={`ss ${dk ? "dk" : i % 2 ? "alt" : ""} k-${s.k}`}><div className="wrap"><Block s={s} /></div></section>;
        })}
      </main>
      <Footer />
    </>
  );
}

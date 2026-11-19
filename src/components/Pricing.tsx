"use client";
import { packages } from "@/data/packages";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const FEATS: { t: string; d: string; icon: React.ReactNode }[] = [
  { t: "Guaranteed placement", d: "On every outlet in your package.", icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" /> },
  { t: "Editorial assistance", d: "Our editors polish your release.", icon: <path d="M5 5h14v10H10l-4 4v-4H5V5z" /> },
  { t: "Live in 24–48 hours", d: "From approval to publication.", icon: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></> },
  { t: "Metric reports", d: "Live links, reach and audience.", icon: <path d="M4 20h16M7 16v-4M12 16V7M17 16v-6" /> },
];

/* the grid is designed for four cards; the full line-up is on /pricing */
export default function Pricing({ limit = 4 }: { limit?: number }) {
  return (
    <div className="pricing pk3">
      <ul className="pk3-feats">
        {FEATS.map((f) => (
          <li key={f.t}>
            <span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{f.icon}</svg></span>
            <div><b>{f.t}</b><span>{f.d}</span></div>
          </li>
        ))}
      </ul>
      <div className="pk3-grid">
        {packages.slice(0, limit).map((p, i) => {
          return (
            <article className="pk3-card" key={p.id} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <div className="pk3-top">
                <div className="pk3-name">
                  <h3>{p.name}<i>.</i></h3>
                  {p.badge && <span className="pk3-badge">{p.badge === "Popular" ? "Most popular" : p.badge}</span>}
                </div>
                <p className="pk3-best">{p.best}</p>

                <p className="pk3-price">
                  <sup>$</sup>{p.price.toLocaleString("en-US")}
                  {p.was && <s>{fmt(p.was)}</s>}
                </p>
                <p className="pk3-per">One-off payment per release<span className={p.was ? "sv" : "sv none"}>{p.was ? `Save ${fmt(p.was - p.price)}` : ""}</span></p>

                <dl className="pk3-rows">
                  <div><dt>{p.stats[0].n}{p.stats[0].suf}</dt><dd>{p.stats[0].l}</dd></div>
                  <div><dt>{p.stats[1].n}{p.stats[1].suf}</dt><dd>{p.stats[1].l}</dd></div>
                  <div><dt>24–48h</dt><dd>to go live</dd></div>
                </dl>

                <a className="pk3-cta" href={`/submit-press-release?package=${p.id}`}>Get started with {p.name}<span aria-hidden>→</span></a>
              </div>

              <div className="pk3-pub">
                <p className="pk3-lab"><span>Where you’ll be published</span><em>{p.outletCount}</em></p>
                <ul>
                  {p.outlets.map((o) => (
                    <li key={o.name}>
                      {o.logo
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <i className="lg" aria-hidden><img src={o.logo} alt="" /></i>
                        : <i aria-hidden>{o.name.replace(/[^A-Za-z]/, "").charAt(0)}</i>}
                      <b>{o.name}</b>
                      <span className={o.tag === "Finance" ? "tag fin" : "tag"}>{o.tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
      <div className="compare"><a className="btn glass" href="/pricing#compare">Compare all {packages.length} packages{packages.length > limit ? ` incl. ${packages[packages.length - 1].name}` : ""}</a></div>
    </div>
  );
}

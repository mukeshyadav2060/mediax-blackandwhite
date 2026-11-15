"use client";
import { packages } from "@/data/packages";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
export default function Pricing() {
  return (
    <div className="pricing pk3">
      <div className="pk3-grid">
        {packages.map((p, i) => {
          return (
            <article className="pk3-card" key={p.id} style={{ ["--d" as string]: `${i * 90}ms` }}>
              <div className="pk3-top">
                <div className="pk3-name">
                  <h3>{p.name}<i>.</i></h3>
                  {p.badge && <span className="pk3-badge">{p.badge === "Popular" ? "Most popular" : p.badge}</span>}
                </div>
                <p className="pk3-best">{p.best}</p>

                <p className="pk3-was">{p.was && <><s>{fmt(p.was)}</s><em>Save {fmt(p.was - p.price)}</em></>}</p>
                <p className="pk3-price">{fmt(p.price)}</p>
                <p className="pk3-per">One-off payment per release</p>

                <div className="pk3-stats">
                  <div><b>{p.stats[0].n}{p.stats[0].suf}</b><span>{p.stats[0].l}</span></div>
                  <div><b>{p.stats[1].l.startsWith("mainstream") ? `${p.stats[1].n}${p.stats[1].suf}` : "—"}</b><span>mainstream articles</span></div>
                  <div><b>Same day</b><span>distribution</span></div>
                </div>

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
      <div className="compare"><a className="btn glass" href="/pricing">Compare every package</a></div>
    </div>
  );
}

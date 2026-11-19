"use client";
import { useState } from "react";
import { services } from "@/data/content";

/* numbered index of services; the active one is detailed in a sticky ink card
   (desktop) or expands in place (mobile) */
export default function ServiceIndex() {
  const [a, setA] = useState(0);
  const s = services[a];
  const n = (i: number) => String(i + 1).padStart(2, "0");
  return (
    <div className="svx">
      <ol className="svx-list">
        {services.map((it, i) => (
          <li key={it.t} className={i === a ? "on" : ""}>
            <button type="button" aria-expanded={i === a} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
              <span className="svx-n">{n(i)}</span>
              <span className="svx-t">{it.t}</span>
              <span className="svx-go" aria-hidden>→</span>
            </button>
            {/* inline detail, shown on small screens only */}
            <div className="svx-m"><div>
              <p>{it.b}</p>
              <a href={it.href} className="svx-lk">Learn more <span aria-hidden>→</span></a>
            </div></div>
          </li>
        ))}
      </ol>

      <div className="svx-side" aria-live="polite">
        <article className="svx-card">
          <div className="svx-in" key={a}>
            <p className="svx-eye"><span>Service {n(a)}</span><span>/ {n(services.length - 1)}</span></p>
            <h3>{s.t}</h3>
            <p className="svx-b">{s.b}</p>
            <p className="svx-lab">Best for</p>
            <ul className="svx-chips">{s.for.map((f) => <li key={f}>{f}</li>)}</ul>
            <a href={s.href} className="svx-cta">Explore {s.t.toLowerCase()} <span aria-hidden>→</span></a>
          </div>
        </article>
      </div>
    </div>
  );
}

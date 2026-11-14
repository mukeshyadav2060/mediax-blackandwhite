"use client";
import { useEffect, useRef, useState } from "react";
import { packages } from "@/data/packages";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
/* eased number tween so figures count up/down when the plan changes */
function useTween(target: number, ms = 700) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current, t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      const cur = start + (target - start) * e;
      from.current = cur;
      setV(cur);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* odometer: every digit is a vertical strip that rolls to its value */
function Odo({ value }: { value: number }) {
  const chars = fmt(value).split("");
  return (
    <span className="odo" aria-label={fmt(value)}>
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <span className="odo-d" key={chars.length - i} aria-hidden>
            <span className="odo-s" style={{ transform: `translateY(${-Number(c) * 10}%)` }}>
              {"0123456789".split("").map((d) => <i key={d}>{d}</i>)}
            </span>
          </span>
        ) : <span className="odo-c" key={chars.length - i} aria-hidden>{c}</span>
      )}
    </span>
  );
}

export default function Pricing() {
  const [idx, setIdx] = useState(2); // start on the popular plan
  const [dir, setDir] = useState(1);
  const plan = packages[idx];
  const card = useRef<HTMLDivElement>(null);

  const pick = (i: number) => { if (i === idx) return; setDir(i > idx ? 1 : -1); setIdx(i); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); pick(Math.min(idx + 1, packages.length - 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pick(Math.max(idx - 1, 0)); }
  };

  const n1 = useTween(plan.stats[0].n);
  const n2 = useTween(plan.stats[1].n);
  const spot = (e: React.PointerEvent) => {
    const r = card.current!.getBoundingClientRect();
    card.current!.style.setProperty("--sx", `${e.clientX - r.left}px`);
    card.current!.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  const group = (label: string, list: string[], dim = false) => (
    <div className={dim ? "pk2-grp dim" : "pk2-grp"}>
      <p className="pk2-lab"><span>{label} · {list.length}</span><i /></p>
      <p className="pk2-names">
        {list.map((n, i) => (
          <span key={n} style={{ animationDelay: `${i * 30}ms` }}>{n}<b aria-hidden>•</b></span>
        ))}
      </p>
    </div>
  );

  return (
    <div className="pricing pk2">
      <div className="pk2-tabs" role="tablist" aria-label="Packages" onKeyDown={onKey} style={{ ["--n" as string]: packages.length, ["--i" as string]: idx }}>
        <i className="pk2-pill" aria-hidden />
        {packages.map((p, i) => (
          <button key={p.id} role="tab" aria-selected={i === idx} tabIndex={i === idx ? 0 : -1} className={i === idx ? "pk2-t on" : "pk2-t"} onClick={() => pick(i)}>
            <span>{p.name}</span><b>{fmt(p.price)}</b>
          </button>
        ))}
      </div>

      <div className="pk2-card" ref={card} onPointerMove={spot}>
        <div className="pk2-glow" aria-hidden />
        <div className={dir > 0 ? "pk2-in from-r" : "pk2-in from-l"} key={plan.id}>
          <div className="pk2-l">
            <p className="pk2-eye">{plan.name} package{plan.badge ? ` · ${plan.badge}` : ""}</p>
            <p className="pk2-price">{plan.was && <s>{fmt(plan.was)}</s>}<Odo value={plan.price} /></p>
            <p className="pk2-sub">{plan.tagline}</p>

            <div className="pk2-stats">
              <div><b>{Math.round(n1)}{plan.stats[0].suf}</b><span>{plan.stats[0].l}</span></div>
              <div><b>{Math.round(n2)}{plan.stats[1].suf}</b><span>{plan.stats[1].l}</span></div>
              <div><b>Same-day</b><span>distribution</span></div>
            </div>

            <ul className="pk2-list">
              {plan.highlights.map((i) => (
                <li key={i}>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>{i}
                </li>
              ))}
            </ul>

            <a className="pk2-cta" href={`/submit-press-release?package=${plan.id}`}>Choose {plan.name}</a>
            <a className="pk2-alt" href="https://calendly.com/mediaxagency/30min">Or ask about bulk pricing</a>
          </div>

          <div className="pk2-r">
            {group("Distribution", plan.distribution)}
            {plan.top && group("Top outlets", plan.top, true)}
            {group("Included", plan.extras, true)}
            <p className="pk2-note">Global distribution, with translation included, is an optional add-on for every plan.</p>
          </div>
        </div>
      </div>
      <div className="compare"><a className="btn glass" href="/pricing">Compare every package</a></div>
    </div>
  );
}

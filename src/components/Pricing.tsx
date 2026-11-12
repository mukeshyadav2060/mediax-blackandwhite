"use client";
import { useEffect, useRef, useState } from "react";
import data from "@/data/plans.json";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const num = (s: string) => parseInt(s, 10) || 0;
const MAX_PUBS = Math.max(...data.plans.map((p) => num(p.publications)));
const MAX_OUT = Math.max(...data.plans.map((p) => p.publishers.length));

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
  const [idx, setIdx] = useState(2);
  const [dir, setDir] = useState(1);
  const plan = data.plans[idx];
  const card = useRef<HTMLDivElement>(null);
  const pubs = plan.publishers
    .map((pid) => data.publishers.find((p) => p.id === pid))
    .filter((p): p is (typeof data.publishers)[number] => !!p);

  const pick = (i: number) => { if (i === idx) return; setDir(i > idx ? 1 : -1); setIdx(i); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); pick(Math.min(idx + 1, data.plans.length - 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); pick(Math.max(idx - 1, 0)); }
  };

  const pubN = useTween(num(plan.publications));
  const outN = useTween(plan.publishers.length);
  const spot = (e: React.PointerEvent) => {
    const r = card.current!.getBoundingClientRect();
    card.current!.style.setProperty("--sx", `${e.clientX - r.left}px`);
    card.current!.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div className="pricing pk">
      {/* stepper: dots on a hairline, the line fills up to the chosen plan */}
      <div className="pk-steps" role="tablist" aria-label="Packages" onKeyDown={onKey} style={{ ["--n" as string]: data.plans.length, ["--i" as string]: idx }}>
        <div className="pk-rail" aria-hidden><i style={{ transform: `scaleX(${idx / (data.plans.length - 1)})` }} /></div>
        {data.plans.map((p, i) => (
          <button key={p.id} role="tab" aria-selected={i === idx} tabIndex={i === idx ? 0 : -1} className={i === idx ? "pk-s on" : i < idx ? "pk-s done" : "pk-s"} onClick={() => pick(i)}>
            <span className="pk-dot" aria-hidden />
            <span className="pk-name">{p.name}</span>
            <span className="pk-price">{fmt(p.price)}</span>
          </button>
        ))}
      </div>

      <div className="plan pk-card" ref={card} onPointerMove={spot}>
        <div className="pk-glow" aria-hidden />
        <div className={dir > 0 ? "pk-body from-r" : "pk-body from-l"} key={plan.id}>
          <p className="eyebrow">{plan.name} package</p>
          <p className="price"><Odo value={plan.price} /></p>

          <div className="pk-meters">
            <div className="pk-m">
              <span className="pk-mv">{Math.round(pubN)}+</span>
              <span className="pk-ml">Guaranteed publications</span>
              <em><i style={{ transform: `scaleX(${num(plan.publications) / MAX_PUBS})` }} /></em>
            </div>
            <div className="pk-m">
              <span className="pk-mv">{Math.round(outN)}</span>
              <span className="pk-ml">Featured outlets</span>
              <em><i style={{ transform: `scaleX(${plan.publishers.length / MAX_OUT})` }} /></em>
            </div>
            <div className="pk-m">
              <span className="pk-mv">24–48h</span>
              <span className="pk-ml">Live after approval</span>
              <em><i style={{ transform: "scaleX(1)" }} /></em>
            </div>
          </div>

          <ul className="chips">
            {plan.includes.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <div className="btn-row">
            <a className="btn purple" href={`/submit-press-release?package=${plan.id}`}>Choose {plan.name}</a>
            <a className="btn white" href="https://calendly.com/mediaxagency/30min">Custom quote</a>
          </div>

          <p className="eyebrow outs">Featured outlets in {plan.name}</p>
          <div className="outlet-grid">
            {pubs.map((p, i) => (
              <div className="tile flip-in" data-n={p.name} style={{ animationDelay: `${i * 28}ms` }} key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo.src} alt={p.name} width={p.logo.width} height={p.logo.height} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="compare"><a className="btn glass" href="/pricing">Compare every package</a></div>
    </div>
  );
}

"use client";
import { useState } from "react";
import data from "@/data/plans.json";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function Pricing() {
  const [id, setId] = useState("gold");
  const plan = data.plans.find((p) => p.id === id)!;
  const pubs = plan.publishers
    .map((pid) => data.publishers.find((p) => p.id === pid))
    .filter((p): p is (typeof data.publishers)[number] => !!p);
  return (
    <div className="pricing">
      <div className="tabs" role="tablist" aria-label="Packages">
        {data.plans.map((p) => (
          <button key={p.id} role="tab" aria-selected={p.id === id} className={p.id === id ? "tab on" : "tab"} onClick={() => setId(p.id)}>
            <span>{p.name}</span>
            <b className="display">{fmt(p.price)}</b>
          </button>
        ))}
      </div>
      <div className="plan" key={plan.id}>
        <p className="eyebrow">{plan.name} package</p>
        <p className="price display">{fmt(plan.price)}</p>
        <p className="pill-pub">{plan.publications}</p>
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
            <div className="tile pop" style={{ animationDelay: `${i * 30}ms` }} key={p.id} title={p.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo.src} alt={p.name} width={p.logo.width} height={p.logo.height} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className="compare"><a className="btn glass" href="/pricing">Compare every package</a></div>
    </div>
  );
}

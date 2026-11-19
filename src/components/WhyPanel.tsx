"use client";
import { useRef } from "react";
import { proof, why } from "@/data/content";
import { Count, Reveal, Split } from "./Motion";

/* dark ink panel: heading, a ruled stat strip, four reasons; soft glow follows the cursor */
export default function WhyPanel() {
  const el = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = el.current!.getBoundingClientRect();
    el.current!.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.current!.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <div className="why" ref={el} onPointerMove={move} data-dark>
      <div className="why-glow" aria-hidden />
      <div className="why-top">
        <div>
          <p className="lbl-s">Why MediaX</p>
          <Split as="h2" className="display h-m" text={"Coverage you can **count on**"} />
        </div>
        <div>
          <Reveal as="p" className="sub">Launches don’t wait, and neither do we. Guaranteed placements, named outlets and a report after every release.</Reveal>
          <Reveal><a className="why-cta" href="/submit-press-release">Get started <span aria-hidden>→</span></a></Reveal>
        </div>
      </div>

      <dl className="why-stats">
        {proof.map(([n, pre, suf, l], i) => (
          <Reveal key={l} delay={i * 80}>
            <dt><Count to={n} prefix={pre} suffix={suf} /></dt>
            <dd>{l}</dd>
          </Reveal>
        ))}
      </dl>

      <div className="why-list">
        {why.map((w, i) => (
          <Reveal key={w.t} delay={i * 80} className="why-i">
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{w.t}</h3>
            <p>{w.b}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

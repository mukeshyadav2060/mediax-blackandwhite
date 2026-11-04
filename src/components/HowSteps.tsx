"use client";
import { useEffect, useRef, useState } from "react";

type Step = { n: string; title: string; body: string; img: string };
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* line-art laptop built in CSS 3D; the lid opens and
   the screen walks through the four steps as the section scrolls past */
export default function HowSteps({ steps, children }: { steps: Step[]; children?: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0, cur = reduce ? 1 : 0, raf = 0, last = -1;

    const read = () => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      target = clamp((vh * 0.95 - r.top) / (r.height + vh * 0.55));
      el.style.setProperty("--k", String(Math.min(1, (el.querySelector(".lap-stage") as HTMLElement).clientWidth / 800)));
    };
    const tick = () => {
      cur += (target - cur) * 0.09;
      const open = ease(clamp(cur / 0.3)), orbit = clamp(cur);
      el.style.setProperty("--open", open.toFixed(4));
      el.style.setProperty("--orb", orbit.toFixed(4));
      const a = Math.min(steps.length - 1, Math.floor(clamp((cur - 0.28) / 0.62) * steps.length));
      if (a !== last) { last = a; setActive(a); }
      raf = requestAnimationFrame(tick);
    };
    read();
    if (reduce) target = 1;
    addEventListener("scroll", read, { passive: true });
    addEventListener("resize", read);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("scroll", read); removeEventListener("resize", read); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <div className="how how-lr" ref={root}>
      <div className="lap-stage" aria-hidden>
        <div className="lap-scene">
          <div className="lap">
            {/* body: thickness layer, top deck, keys, trackpad */}
            <div className="deck under" />
            <div className="deck">
              <div className="keys">{Array.from({ length: 60 }, (_, i) => <i key={i} />)}</div>
              <div className="pad" />
            </div>
            {/* lid hinged on the back edge */}
            <div className="lid">
              <div className="face front" />
              <div className="face back">
                <div className="screen">
                  {steps.map((s, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={s.n} src={`/media/${s.img}.webp`} alt="" className={i === active ? "on" : ""} draggable={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-side">
        {children}
      <div className="how-cols">
        {steps.map((s, i) => (
          <div className={i === active ? "how-i on" : "how-i"} key={s.n}>
            <span className="n">0{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

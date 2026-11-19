"use client";
import { useEffect, useRef, useState } from "react";

/* ---- small building blocks ---- */
function Item({ x, y, d, i = 0, w, r = 0, className = "", children }: { x: number; y: number; d: number; i?: number; w?: number; r?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`fl ${className}`} style={{ left: `${x}%`, top: `${y}%`, ["--d" as string]: d, ["--i" as string]: i, ["--ox" as string]: x - 50, ["--oy" as string]: y - 50, width: w ? `${w}vw` : undefined }}>
      <div className="fl-in" style={{ ["--r" as string]: `${r}deg`, animationDelay: `${-i * 0.9}s` }}>{children}</div>
    </div>
  );
}
const Win = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`win ${className}`}><div className="win-bar"><i /><i /><i /></div><div className="win-body">{children}</div></div>
);
const POOL = ["cointelegraph", "coinmarketcap", "business-insider", "apnews", "binance", "benzinga", "the-block", "decrypt", "marketwatch", "invezz", "hackernoon", "coinedition", "bitcoinist", "newsbtc", "the-defiant", "u-today", "cryptobriefing", "investing-com"];
const Face = ({ id }: { id: string }) => (
  <div className="app">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/media/outlet-${id}.webp`} alt="" draggable={false} /></div>
);

/* an outlet tile that flips over to a different outlet at random moments */
function FlipTile({ start, shown, slot }: { start: string; shown: React.MutableRefObject<string[]>; slot: number }) {
  const [faces, setFaces] = useState<[string, string]>([start, start]);
  const [side, setSide] = useState(0); // which face is showing
  const sideRef = useRef(0);
  useEffect(() => {
    shown.current[slot] = start;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      const choices = POOL.filter((id) => !shown.current.includes(id));
      const id = choices[Math.floor(Math.random() * choices.length)];
      const cur = sideRef.current;
      setFaces((f) => (cur === 0 ? [f[0], id] : [id, f[1]])); // load the hidden face, then turn it up
      sideRef.current = 1 - cur;
      setSide(1 - cur);
      shown.current[slot] = id;
      t = setTimeout(next, 2600 + Math.random() * 3600);
    };
    t = setTimeout(next, 1800 + Math.random() * 3000 + slot * 600);
    return () => clearTimeout(t);
  }, [shown, slot, start]);
  return (
    <div className="flip">
      <div className="flip-in" style={{ transform: `rotateY(${side * 180}deg)` }}>
        <div className="flip-f"><Face id={faces[0]} /></div>
        <div className="flip-f back"><Face id={faces[1]} /></div>
      </div>
    </div>
  );
}

function Cursor({ x, y, color, label, d, i, dx, dy, t }: { x: number; y: number; color: string; label: string; d: number; i: number; dx: number; dy: number; t: number }) {
  return (
    <div className="cur-wrap fl" style={{ left: `${x}%`, top: `${y}%`, ["--d" as string]: d, ["--i" as string]: i + 6, ["--ox" as string]: x - 50, ["--oy" as string]: y - 50 }}>
      <div className="cur" style={{ ["--c" as string]: color, ["--dx" as string]: `${dx}vw`, ["--dy" as string]: `${dy}vw`, animationDuration: `${t}s`, animationDelay: `${-i * 1.7}s` }}>
        <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden><path d="M1 1l6.5 17 2.4-7.1L17 8.5z" fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const shown = useRef<string[]>([]); // outlets currently on display, so tiles never repeat

  /* mouse + scroll parallax, driven through CSS variables */
  useEffect(() => {
    const el = root.current!;
    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
    const onMove = (e: PointerEvent) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
    const tick = () => {
      mx += (tx - mx) * 0.07; my += (ty - my) * 0.07;
      el.style.setProperty("--mx", (mx * 60).toFixed(2));
      el.style.setProperty("--my", (my * 60).toFixed(2));
      el.style.setProperty("--sy", String(Math.min(scrollY, innerHeight * 1.2)));
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-grid" aria-hidden />

      {/* ---- floating canvas ---- */}
      <div className="stage" aria-hidden>
        <Item x={20} y={20} d={0.9} i={2}><FlipTile start="cointelegraph" shown={shown} slot={0} /></Item>
        <Item x={74} y={18} d={0.8} i={3}><FlipTile start="coinmarketcap" shown={shown} slot={1} /></Item>
        <Item x={-2} y={50} d={0.5} i={7} w={17} r={-3} className="hide-m"><Win className="shot"><img src="/media/step-step-2-submit-your-press-release.webp" alt="" draggable={false} /></Win></Item>
        <Item x={85} y={55} d={0.6} i={12} w={15} r={3} className="hide-m"><Win className="shot"><img src="/media/step-step-1-choose-your-package.webp" alt="" draggable={false} /></Win></Item>
        <Item x={22} y={76} d={1.0} i={8}><FlipTile start="business-insider" shown={shown} slot={2} /></Item>
        <Item x={72} y={78} d={0.9} i={11}><FlipTile start="apnews" shown={shown} slot={3} /></Item>


        <Cursor x={26} y={13} color="#26211e" label="PR Strategist" d={1.2} i={0} dx={1.4} dy={1.0} t={7} />
        <Cursor x={80} y={70} color="#26211e" label="Editor" d={1.3} i={1} dx={-1.6} dy={0.8} t={8} />
      </div>

      {/* ---- centre: copy ---- */}
      <div className="core">
        <p className="eyebrow-pill">Crypto press release distribution</p>
        <h1 className="pre display-i">Get featured in top-tier crypto media.</h1>
        <p className="hero-sub2">
          Guaranteed press release distribution across leading crypto and mainstream outlets for Web3, DeFi and blockchain projects. Packages from $600, live in 24–48 hours.
        </p>
        <div className="hero-cta">
          <a className="btn ink" href="/submit-press-release">Get started</a>
          <a className="btn glass dark" href="#how">How it works</a>
        </div>
      </div>
    </section>
  );
}

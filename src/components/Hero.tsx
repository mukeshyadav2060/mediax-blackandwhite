"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const WORDS = ["Headlines.", "Trust.", "Reach.", "Traction."];

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
const Tile = ({ src, alt }: { src: string; alt: string }) => (
  <div className="app">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt={alt} draggable={false} /></div>
);
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
  const meas = useRef<(HTMLSpanElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const [w, setW] = useState(0);
  const [on, setOn] = useState(true);

  /* rotate the headline word + resize the selection box to fit it */
  useLayoutEffect(() => {
    const fit = () => setW(meas.current[idx]?.offsetWidth ?? 0);
    fit();
    document.fonts?.ready.then(fit);
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, [idx]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = setInterval(() => setIdx((n) => (n + 1) % WORDS.length), 2800);
    const b = setInterval(() => setOn((v) => !v), 2400);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

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
        <Item x={27} y={13} d={0.9} i={2}><Tile src="/media/outlet-cointelegraph.webp" alt="Cointelegraph" /></Item>
        <Item x={71} y={12} d={0.8} i={3} className="hide-m"><Tile src="/media/outlet-binance.webp" alt="Binance" /></Item>
        <Item x={44} y={8} d={0.6} i={4} className="hide-m">
          <div className="toggle"><span>Express publishing</span><b className={on ? "sw on" : "sw"}><i /></b></div>
        </Item>
        <Item x={19} y={35} d={1.0} i={5} className="hide-m"><Tile src="/media/outlet-coinmarketcap.webp" alt="CoinMarketCap" /></Item>
        <Item x={71} y={35} d={0.7} i={6} className="hide-m">
          <div className="bubble"><img src="/media/mark.svg" alt="" width={36} height={36} /><div><p><b>MediaX</b> <em>online right now</em></p><p>Let’s get your story published.</p></div></div>
        </Item>
        <Item x={-3} y={43} d={0.5} i={7} w={19} r={-3} className="hide-m"><Win className="shot"><img src="/media/step-step-2-submit-your-press-release.webp" alt="" draggable={false} /></Win></Item>
        <Item x={19} y={58} d={1.1} i={8} className="hide-m"><Tile src="/media/outlet-business-insider.webp" alt="Business Insider" /></Item>
        <Item x={2.5} y={69} d={0.6} i={9} w={16} r={3} className="hide-m">
          <Win><ul className="tracker">{[["Cointelegraph", "Live"], ["The Block", "Live"], ["Yahoo Finance", "Live"], ["Decrypt", "Queued"]].map(([n, s]) => <li key={n}><i />{n}<b className={s === "Live" ? "ok" : ""}>{s}</b></li>)}</ul></Win>
        </Item>
        <Item x={40} y={89} d={0.7} i={10} className="hide-m">
          <div className="bubble"><img src="/media/mark.svg" alt="" width={36} height={36} /><div><p><b>MediaX</b> <em>online right now</em></p><p>Live within 24–48 hours of approval.</p></div></div>
        </Item>
        <Item x={30} y={84} d={1.0} i={11} className="hide-m"><Tile src="/media/outlet-apnews.webp" alt="AP News" /></Item>
        <Item x={73} y={74} d={0.5} i={12} w={14} r={-3} className="hide-m">
          <Win><div className="bars">{[38, 62, 48, 80, 66, 94].map((h, k) => <i key={k} style={{ height: `${h}%`, animationDelay: `${k * 90}ms` }} />)}<span>Metric report</span></div></Win>
        </Item>
        <Item x={81} y={13} d={0.4} i={13} w={17} r={4} className="hide-m"><Win className="shot"><img src="/media/step-step-1-choose-your-package.webp" alt="" draggable={false} /></Win></Item>
        <Item x={90} y={46} d={0.9} i={14} w={9.5} r={5} className="hide-t">
          <div className="phone"><span className="notch" /><img src="/media/step-step-4-track-measure-success.webp" alt="" draggable={false} /></div>
        </Item>

        <Cursor x={29} y={9} color="#e83fb9" label="PR Strategist" d={1.2} i={0} dx={1.4} dy={1.0} t={7} />
        <Cursor x={52} y={37} color="#2f7cf6" label="Editor" d={1.4} i={1} dx={-2.2} dy={0.8} t={8} />
        <Cursor x={56} y={53} color="#f2b705" label="Media Relations" d={1.3} i={2} dx={1.8} dy={-.4} t={9} />
        <Cursor x={21} y={50} color="#5b4de0" label="Copywriter" d={1.2} i={3} dx={1.0} dy={1.6} t={7.5} />
        <Cursor x={23} y={80} color="#2fa6c8" label="Analyst" d={1.1} i={4} dx={-1.6} dy={-1.0} t={8.5} />
        <Cursor x={91} y={85} color="#e5532d" label="Client" d={1.3} i={5} dx={-1.2} dy={1.2} t={6.5} />
      </div>

      {/* ---- centre: selection box + copy ---- */}
      <div className="core">
        <p className="eyebrow-pill">Crypto press release distribution</p>
        <p className="pre display-i">Get featured. Make</p>
        <div className="sel" style={{ ["--w" as string]: w ? `${w}px` : undefined }}>
          <i className="h tl" /><i className="h tr" /><i className="h bl" /><i className="h br" /><i className="h tm" /><i className="h bm" />
          <h1 aria-label={WORDS[idx]}>
            {WORDS.map((t, k) => (
              <span key={t} className={k === idx ? "wd cur" : k === (idx + WORDS.length - 1) % WORDS.length ? "wd out" : "wd"} aria-hidden>{t}</span>
            ))}
          </h1>
          {WORDS.map((t, k) => <span className="m" key={t} ref={(el) => { meas.current[k] = el; }} aria-hidden>{t}</span>)}
        </div>
        <p className="hero-sub2">
          Trusted press release distribution on top-tier crypto &amp; mainstream media for Web3, DeFi and blockchain projects. Live in 24–48 hours.
        </p>
        <div className="hero-cta">
          <a className="btn ink" href="/submit-press-release">Get started</a>
          <a className="btn glass dark" href="/pricing">How it works</a>
        </div>
      </div>
    </section>
  );
}

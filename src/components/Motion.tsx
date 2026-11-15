"use client";
import { createElement, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/* ---------- Smooth scroll (Lenis) ---------- */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}

export const lenisOf = () => (window as unknown as { __lenis?: Lenis }).__lenis;

/* ---------- In-view hook ---------- */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on] as const;
}

/* ---------- Title with masked word-by-word reveal. **bold** => <strong> ---------- */
export function Split({ text, as = "h2", className = "", delay = 0 }: { text: string; as?: string; className?: string; delay?: number }) {
  const [ref, on] = useInView<HTMLElement>(0.3);
  let k = 0;
  const lines = text.split("\n").map((line, li) => {
    const out: React.ReactNode[] = [];
    const segs = line.split(/(\*\*[^*]+\*\*)/);
    segs.forEach((seg, si) => {
      const strong = seg.startsWith("**");
      const text = strong ? seg.slice(2, -2) : seg;
      const words = text.split(" ").filter(Boolean);
      // no gap before punctuation that hugs the previous segment ("**pricing**, …")
      const next = segs[si + 1];
      const glue = !!next && !/^\s/.test(next) && !/\s$/.test(text) && !next.startsWith("**");
      words.forEach((w, wi) => {
        const inner = (
          <span className="w">
            <span className="i" style={{ transitionDelay: `${delay + k++ * 55}ms` }}>{w}</span>
          </span>
        );
        out.push(<span key={`${li}-${si}-${wi}`}>{strong ? <strong>{inner}</strong> : inner}{glue && wi === words.length - 1 ? "" : " "}</span>);
      });
    });
    return <span className="ln" key={li}>{out}</span>;
  });
  return createElement(as, { ref, className: `split ${on ? "in" : ""} ${className}` }, lines);
}

/* ---------- Fade/slide up ---------- */
export function Reveal({ children, className = "", delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: string }) {
  const [ref, on] = useInView<HTMLElement>(0.15);
  return createElement(as, { ref, className: `rv ${on ? "in" : ""} ${className}`, style: { transitionDelay: `${delay}ms` } }, children);
}

/* ---------- Count up ---------- */
export function Count({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [ref, on] = useInView<HTMLSpanElement>(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - t0) / 1600, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [on, to]);
  return <span ref={ref}>{prefix}{v.toLocaleString("en-US")}{suffix}</span>;
}

/* ---------- Preloader ---------- */
export function Loader() {
  const [state, setState] = useState<"show" | "out" | "gone">("show");
  useEffect(() => {
    document.documentElement.classList.add("loading");
    const a = setTimeout(() => { document.documentElement.classList.remove("loading"); setState("out"); }, 1300);
    const b = setTimeout(() => setState("gone"), 2400);
    return () => { clearTimeout(a); clearTimeout(b); document.documentElement.classList.remove("loading"); };
  }, []);
  if (state === "gone") return null;
  return (
    <div className={`loader ${state}`} aria-hidden>
      <svg className="spinner" viewBox="0 0 54 54" width="54" height="54"><path d="M0 24 L26 0 V24 Z" fill="#fff" /><path d="M54 30 L28 54 V30 Z" fill="#fff" /></svg>
    </div>
  );
}

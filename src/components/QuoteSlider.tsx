"use client";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/content";

const n = testimonials.length;
const clean = (q: string) => q.replace(/^“|”$/g, "");

/* one wide quote at a time; the next one slides in from the right */
export default function QuoteSlider() {
  const [i, setI] = useState(0);
  const [snap, setSnap] = useState(false); // jump back to 0 without animating
  const hold = useRef(0);
  const hover = useRef(false);

  // autoplay
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!hover.current && performance.now() > hold.current) setI((v) => v + 1);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  // after sliding onto the cloned first slide, reset to the real one silently
  useEffect(() => {
    if (i !== n) return;
    const t = setTimeout(() => { setSnap(true); setI(0); }, 900);
    return () => clearTimeout(t);
  }, [i]);
  useEffect(() => {
    if (!snap) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
    return () => cancelAnimationFrame(r);
  }, [snap]);

  const go = (d: number) => {
    hold.current = performance.now() + 8000;
    setSnap(false);
    setI((v) => (d > 0 ? Math.min(v + 1, n) : v === 0 ? n - 1 : v - 1));
  };

  const slides = [...testimonials, testimonials[0]];
  return (
    <div className="qs" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
      <div className="qs-view">
        <div className="qs-track" style={{ transform: `translateX(${-i * 100}%)`, transition: snap ? "none" : undefined }}>
          {slides.map((t, k) => (
            <figure className="qs-slide" key={k} aria-hidden={k !== i % (n + 1)}>
              <blockquote>“{clean(t.quote)}”</blockquote>
              <figcaption><b>{t.name}</b> — {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="qs-ctrl">
        <button aria-label="Previous testimonial" onClick={() => go(-1)}>←</button>
        <span className="qs-count">{String((i % n) + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button aria-label="Next testimonial" onClick={() => go(1)}>→</button>
      </div>
    </div>
  );
}

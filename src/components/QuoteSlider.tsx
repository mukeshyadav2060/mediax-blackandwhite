"use client";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/content";

const n = testimonials.length;
const clean = (q: string) => q.replace(/^“|”$/g, "");

/* one wide quote at a time; the next one slides in from the right.
   Drag / swipe the quote to move between slides. */
export default function QuoteSlider() {
  const [i, setI] = useState(0);
  const [snap, setSnap] = useState(false); // jump back to 0 without animating
  const hold = useRef(0);
  const hover = useRef(false);
  const [dx, setDx] = useState(0);              // live drag offset in px
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; x0: number; t0: number; w: number } | null>(null);

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

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x0: e.clientX, t0: performance.now(), w: e.currentTarget.clientWidth };
    e.currentTarget.setPointerCapture(e.pointerId);
    hold.current = performance.now() + 8000;
    setSnap(false);
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const off = e.clientX - d.x0;
    setDx(i === 0 && off > 0 ? off * 0.35 : off); // resist dragging back past the first quote
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    const off = e.clientX - d.x0;
    const fast = Math.abs(off) / Math.max(1, performance.now() - d.t0) > 0.5; // flick: > 0.5 px/ms
    setDragging(false);
    setDx(0);
    if (Math.abs(off) > d.w * 0.15 || (fast && Math.abs(off) > 20)) {
      if (off < 0) go(1);
      else if (i > 0) go(-1);
    }
  };

  const slides = [...testimonials, testimonials[0]];
  return (
    <div className="qs" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
      <div className={dragging ? "qs-view drag" : "qs-view"} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <div className="qs-track" style={{ transform: `translateX(calc(${-i * 100}% + ${dx}px))`, transition: snap || dragging ? "none" : undefined }}>
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

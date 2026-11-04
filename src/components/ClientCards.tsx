"use client";
import { useEffect, useRef } from "react";
import { testimonials } from "@/data/content";

/* testimonial cards: drift right-to-left on their own, with arrows + drag to steer */
export default function ClientCards() {
  const rail = useRef<HTMLDivElement>(null);
  const hold = useRef(0); // timestamp until which autoplay stays paused

  useEffect(() => {
    const el = rail.current!;
    const n = testimonials.length;
    const half = () => (el.children[n] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = half(), raf = 0, hover = false;
    el.scrollLeft = pos;

    const tick = (t: number) => {
      const h = half();
      if (!reduce && !hover && t > hold.current) {
        pos += 0.45;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      // keep the loop seamless in both directions
      if (pos >= h * 2 - 2) { pos -= h; el.scrollLeft = pos; }
      else if (pos <= 1) { pos += h; el.scrollLeft = pos; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enter = () => { hover = true; };
    const leave = () => { hover = false; };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); };
  }, []);

  const step = (dir: number) => {
    const el = rail.current!;
    hold.current = performance.now() + 3000;
    const card = el.children[0] as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: "smooth" });
  };

  const drag = useRef({ on: false, x: 0, l: 0 });
  return (
    <div className="rv-mq">
      <div
        className="rv-rail"
        ref={rail}
        data-lenis-prevent
        onPointerDown={(e) => { drag.current = { on: true, x: e.clientX, l: rail.current!.scrollLeft }; hold.current = performance.now() + 3000; }}
        onPointerMove={(e) => { const d = drag.current; if (d.on) rail.current!.scrollLeft = d.l - (e.clientX - d.x); }}
        onPointerUp={() => (drag.current.on = false)}
        onPointerLeave={() => (drag.current.on = false)}
      >
        {[0, 1, 2].map((k) => testimonials.map((t) => (
          <article className="review" key={`${k}-${t.name}`} aria-hidden={k !== 1}>
            <p>“{t.quote.replace(/^“|”$/g, "")}”</p>
            <footer>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/${t.img}.webp`} alt="" width={44} height={44} draggable={false} />
              <div><b>{t.name}</b><span>{t.role}</span></div>
            </footer>
          </article>
        )))}
      </div>
      <div className="rv-ctrl">
        <button aria-label="Previous testimonial" onClick={() => step(-1)}>←</button>
        <button aria-label="Next testimonial" onClick={() => step(1)}>→</button>
      </div>
    </div>
  );
}

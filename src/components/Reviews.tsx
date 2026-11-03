"use client";
import { useRef } from "react";
import { testimonials } from "@/data/content";

export default function Reviews() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, l: 0, moved: false });
  const by = (d: number) => rail.current?.scrollBy({ left: d * (rail.current.clientWidth * 0.5), behavior: "smooth" });
  return (
    <div className="reviews">
      <div
        className="rail"
        ref={rail}
        onPointerDown={(e) => { drag.current = { on: true, x: e.clientX, l: rail.current!.scrollLeft, moved: false }; }}
        onPointerMove={(e) => { const d = drag.current; if (!d.on) return; d.moved = true; rail.current!.scrollLeft = d.l - (e.clientX - d.x); }}
        onPointerUp={() => (drag.current.on = false)}
        onPointerLeave={() => (drag.current.on = false)}
        data-lenis-prevent
      >
        {testimonials.map((t) => (
          <article className="review" key={t.name}>
            <p>“{t.quote}”</p>
            <footer>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/${t.img}.webp`} alt="" width={56} height={56} draggable={false} />
              <div><b>{t.name}</b><span>{t.role}</span></div>
            </footer>
          </article>
        ))}
      </div>
      <div className="rail-ctrl">
        <button className="btn glass dark round" aria-label="Previous" onClick={() => by(-1)}>←</button>
        <button className="btn glass dark round" aria-label="Next" onClick={() => by(1)}>→</button>
      </div>
    </div>
  );
}

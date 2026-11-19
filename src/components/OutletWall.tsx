"use client";
import { useEffect, useRef } from "react";
import plans from "@/data/plans.json";

/* two rows of outlet names drifting in opposite directions. Both rows share one
   offset `x`: row 1 moves by -x, row 2 by +x — so dragging / swiping / trackpad-
   scrolling either row moves the other the opposite way. */
const ROWS: { ids: string[]; sign: 1 | -1 }[] = [
  { sign: 1, ids: ["cointelegraph", "the-block", "decrypt", "coinmarketcap", "news-bitcoin-com", "be-in-crypto", "u-today", "the-defiant", "bitcoinist", "newsbtc"] },
  { sign: -1, ids: ["business-insider", "apnews", "marketwatch", "investing-com", "benzinga", "morningstar", "street-insider", "hackernoon", "invezz", "cryptobriefing"] },
];
const pub = (id: string) => plans.publishers.find((p) => p.id === id)!;
const AUTO = 0.45; // px per frame of idle drift

export default function OutletWall() {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0, v = 0, raf = 0;
    let drag: { id: number; sign: number; last: number; t: number } | null = null;
    const els = tracks.current.filter(Boolean) as HTMLDivElement[];

    const paint = () => {
      els.forEach((el, i) => {
        const w = el.scrollWidth / 2;                       // one copy of the list
        const off = ((ROWS[i].sign * x) % w + w) % w;        // wrap into [0, w)
        el.style.transform = `translate3d(${-off}px,0,0)`;
      });
    };
    const tick = () => {
      if (!drag) {
        v *= 0.94;                                          // momentum after release
        if (Math.abs(v) < 0.01) v = 0;
        x += v + (reduce ? 0 : AUTO);
      }
      paint();
      raf = requestAnimationFrame(tick);
    };

    const down = (sign: number) => (e: PointerEvent) => {
      drag = { id: e.pointerId, sign, last: e.clientX, t: performance.now() };
      v = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.last, now = performance.now();
      const d = -dx * drag.sign;                            // the dragged row follows the pointer
      x += d;
      v = d / Math.max(1, (now - drag.t) / 16.7);           // px per frame, for the fling
      drag.last = e.clientX; drag.t = now;
    };
    const up = (e: PointerEvent) => { if (drag && e.pointerId === drag.id) drag = null; };
    const wheel = (sign: number) => (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical wheel keeps scrolling the page
      e.preventDefault();
      x += e.deltaX * sign;
      v = 0;
    };

    const off: (() => void)[] = [];
    els.forEach((el, i) => {
      const row = el.parentElement!, sign = ROWS[i].sign;
      const d = down(sign), w = wheel(sign);
      row.addEventListener("pointerdown", d);
      row.addEventListener("pointermove", move);
      row.addEventListener("pointerup", up);
      row.addEventListener("pointercancel", up);
      row.addEventListener("wheel", w, { passive: false });
      off.push(() => {
        row.removeEventListener("pointerdown", d); row.removeEventListener("pointermove", move);
        row.removeEventListener("pointerup", up); row.removeEventListener("pointercancel", up);
        row.removeEventListener("wheel", w);
      });
    });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); off.forEach((f) => f()); };
  }, []);

  return (
    <div className="ow">
      {ROWS.map((row, r) => (
        <div className="ow-row" key={r}>
          <div className="ow-track" ref={(el) => { tracks.current[r] = el; }}>
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 || undefined}>
                {row.ids.map(pub).map((p) => (
                  <li key={p.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <i><img src={p.logo.src} alt="" loading="lazy" draggable={false} /></i>
                    <span>{p.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

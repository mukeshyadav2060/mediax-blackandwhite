"use client";
import { useRef } from "react";

export type Work = { title: string; href: string; tag: string; img: string };

/* Card whose image is revealed through a blurred circle that follows the cursor */
function Card({ w, i }: { w: Work; i: number }) {
  const el = useRef<HTMLAnchorElement>(null);
  const st = useRef({ x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0, raf: 0 });

  const loop = () => {
    const s = st.current, e = el.current;
    if (!e) return;
    s.x += (s.tx - s.x) * 0.16; s.y += (s.ty - s.y) * 0.16; s.s += (s.ts - s.s) * 0.12;
    e.style.setProperty("--x", `${s.x}px`);
    e.style.setProperty("--y", `${s.y}px`);
    e.style.setProperty("--scale", s.s.toFixed(3));
    e.style.setProperty("--blur", `${((1 - s.s) * 14).toFixed(1)}px`);
    if (Math.abs(s.s - s.ts) > 0.001 || Math.abs(s.tx - s.x) > 0.5 || Math.abs(s.ty - s.y) > 0.5) s.raf = requestAnimationFrame(loop);
    else s.raf = 0;
  };
  const kick = () => { if (!st.current.raf) st.current.raf = requestAnimationFrame(loop); };
  const move = (ev: React.PointerEvent) => {
    const r = el.current!.getBoundingClientRect();
    st.current.tx = ev.clientX - r.left; st.current.ty = ev.clientY - r.top;
    kick();
  };
  return (
    <a
      ref={el}
      href={w.href}
      className="work"
      style={{ ["--bg" as string]: `url(/media/${w.img}.webp)` }}
      onPointerEnter={(e) => { move(e); st.current.x = st.current.tx; st.current.y = st.current.ty; st.current.ts = 1; kick(); }}
      onPointerMove={move}
      onPointerLeave={() => { st.current.ts = 0; kick(); }}
    >
      <span className="work-n">{String(i + 1).padStart(2, "0")}</span>
      <h3 className="display">{w.title}</h3>
      <span className="tag">{w.tag}</span>
      <span className="work-img" />
    </a>
  );
}

export default function WorkCards({ items }: { items: Work[] }) {
  return <div className="works">{items.map((w, i) => <Card key={w.title} w={w} i={i} />)}</div>;
}

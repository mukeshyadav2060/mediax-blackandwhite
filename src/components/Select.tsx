"use client";
import { useEffect, useId, useRef, useState } from "react";

export type Opt = { value: string; label: string; hint?: string };

/* custom dropdown: pill trigger, glass list, keyboard + outside-click support */
export default function Select({ label, name, options, value, onChange }: { label: string; name: string; options: Opt[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();
  const cur = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const off = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    addEventListener("pointerdown", off);
    return () => removeEventListener("pointerdown", off);
  }, [open]);

  const pick = (v: string) => { onChange(v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setHi(options.indexOf(cur)); return setOpen(true); }
      setHi((h) => (h + (e.key === "ArrowDown" ? 1 : options.length - 1)) % options.length);
    }
    if ((e.key === "Enter" || e.key === " ") && open) { e.preventDefault(); pick(options[hi].value); }
  };

  return (
    <div className={open ? "sel-dd open" : "sel-dd"} ref={box} onKeyDown={onKey}>
      <span className="lbl" id={id}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button type="button" className="sel-btn" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={id}
        onClick={() => { setHi(options.indexOf(cur)); setOpen((o) => !o); }}>
        <span>{cur.label}</span>
        {cur.hint && <em>{cur.hint}</em>}
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <ul className="sel-list" role="listbox" aria-labelledby={id}>
        {options.map((o, i) => (
          <li key={o.value} role="option" aria-selected={o.value === value} className={(o.value === value ? "on " : "") + (i === hi ? "hi" : "")}
            onMouseEnter={() => setHi(i)} onClick={() => pick(o.value)}>
            <span>{o.label}</span>{o.hint && <em>{o.hint}</em>}
            {o.value === value && <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M2.5 7.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </li>
        ))}
      </ul>
    </div>
  );
}

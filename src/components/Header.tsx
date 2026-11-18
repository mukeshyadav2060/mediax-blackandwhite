"use client";
import { useEffect, useState } from "react";
import { lenisOf } from "./Motion";

const nav = [["Pricing", "/pricing"], ["About", "/about"], ["Feed", "/feed"], ["Blog", "/blogs"], ["FAQ", "/faq"], ["Contact", "/contact"]];

function Roll({ children }: { children: string }) {
  return <span className="roll"><span>{children}</span><span aria-hidden>{children}</span></span>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHide(y > last && y > 160);
      last = y;
      // dark surface under the header? (sections tagged data-dark)
      setDark([...document.querySelectorAll("[data-dark]")].some((el) => { const r = el.getBoundingClientRect(); return r.top <= 44 && r.bottom >= 44; }));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const l = lenisOf();
    if (open) l?.stop(); else l?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={`hd ${hide && !open ? "hide" : ""} ${open ? "open" : ""} ${dark ? "dark" : ""}`}>
      <div className="hd-bar">
        <a href="/" className="hd-logo" aria-label="MediaX home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/logo.png" alt="" width={36} height={36} /><b aria-hidden>ediaX</b>
        </a>
        <div className="hd-actions">
          <button className="btn glass" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Roll>{open ? "Close" : "Menu"}</Roll>
            <i className={open ? "burger x" : "burger"}><u /><u /></i>
          </button>
          <a className="btn white" href="/submit-press-release"><Roll>Submit PR</Roll></a>
        </div>
      </div>

      <section className="menu" aria-hidden={!open}>
        <div className="menu-in">
          <nav className="menu-main" aria-label="Main">
            <p className="lbl-s">Menu</p>
            <ol>
              {nav.map(([l, h], i) => (
                <li key={l} style={{ ["--i" as string]: i }}>
                  <a href={h} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                    <span className="mn-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mn-l">{l}</span>
                    <i aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    </header>
  );
}

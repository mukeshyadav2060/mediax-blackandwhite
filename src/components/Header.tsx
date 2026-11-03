"use client";
import { useEffect, useState } from "react";
import { lenisOf } from "./Motion";
import { footer } from "@/data/content";

const nav = [["Services", "/#services"], ["How it works", "/#how"], ["Pricing", "/#pricing"], ["Clients", "/#clients"], ["Blog", "/#blog"], ["FAQ", "/#faq"], ["Contact", "/#contact"]];

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
          <img src="/media/mark.svg" alt="" width={40} height={40} /><b>MediaX</b>
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
          <div className="widgets">
            <a href="/services" onClick={() => setOpen(false)} className="widget w-big" style={{ backgroundImage: "url(/media/feature-media-relations.webp)" }}>
              <span className="display">Crypto Press Release</span>
              <span className="btn glass sm">Discover</span>
            </a>
            <a href="/pricing" onClick={() => setOpen(false)} className="widget w-p">
              <span className="tag">Pricing</span>
              <span className="display">Packages from $600</span>
            </a>
            <a href="/blogs/web3-press-release-framework" onClick={() => setOpen(false)} className="widget w-c">
              <span className="tag">Latest guide</span>
              <span className="display">Web3 Press Release Framework</span>
            </a>
          </div>
          <div className="menu-cols">
            <nav>
              <p className="eyebrow">Explore</p>
              {nav.map(([l, h]) => <a key={l} href={h} className="big" onClick={() => setOpen(false)}>{l}</a>)}
            </nav>
            <nav>
              <p className="eyebrow">PR services</p>
              {footer.pr.map(([l, h]) => <a key={l} href={h} className="sm">{l}</a>)}
            </nav>
            <nav>
              <p className="eyebrow">Marketing</p>
              {footer.marketing.map(([l, h]) => <a key={l} href={h} className="sm">{l}</a>)}
            </nav>
            <nav>
              <p className="eyebrow">Get in touch</p>
              <a className="sm" href="mailto:contact@mediax.agency">contact@mediax.agency</a>
              <a className="sm" href="https://t.me/MediaxPR">Telegram</a>
              <a className="sm" href="https://x.com/AgencyMediax">X</a>
              <a className="sm" href="https://www.linkedin.com/company/mediax-agencyy/">LinkedIn</a>
            </nav>
          </div>
        </div>
      </section>
    </header>
  );
}

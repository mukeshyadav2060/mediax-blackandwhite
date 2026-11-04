import { Reveal, Split } from "./Motion";
import { footer } from "@/data/content";

const CAL = "https://calendly.com/mediaxagency/30min";
function Roll({ children }: { children: string }) {
  return <span className="roll"><span>{children}</span><span aria-hidden>{children}</span></span>;
}

export default function Footer() {
  return (
    <>
    <footer id="contact" className="foot">
      <div className="wrap">
        <Split as="h2" className="display foot-title" text={"Ready to\nget **featured?**"} />
        <Reveal as="p" className="lead c">Get in touch with our crypto PR team and get your project up and running. We’ll get back to you within 24 hours.</Reveal>
        <Reveal className="btn-row center">
          <a className="btn white big" href="/submit-press-release"><Roll>Get started</Roll></a>
          <a className="btn glass big" href={CAL}><Roll>Book a call</Roll></a>
        </Reveal>

        <div className="foot-grid">
          <div className="foot-about">
            <div className="hd-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/logo.png" alt="" width={34} height={34} /><b>MediaX</b>
            </div>
            <p>MediaX is a renowned Crypto Marketing &amp; PR Agency in Blockchain space dedicatedly helping NFT, DeFi, Web3 and Meta Verse projects in PR, Branding and Marketing.</p>
            <p className="addr">MEDIAX AGENCY - FZCO<br />Al Mankhool, Bur Dubai, Dubai<br />Salt Lake, Kolkata India-700091</p>
          </div>
          {([["Company", footer.company], ["Get started", footer.getStarted], ["PR services", footer.pr], ["Marketing services", footer.marketing], ["Sectors", footer.sectors]] as const).map(([t, ls]) => (
            <div key={t}>
              <h4 className="eyebrow">{t}</h4>
              <ul>{ls.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
            </div>
          ))}
          <div>
            <h4 className="eyebrow">Get in touch</h4>
            <ul>
              <li><a href="/contact">Contact us</a></li>
              <li><a href={CAL}>Book a call</a></li>
              <li><a href="mailto:contact@mediax.agency">contact@mediax.agency</a></li>
              <li><a href="https://t.me/MediaxPR">Telegram</a></li>
              <li><a href="https://x.com/AgencyMediax">X</a></li>
              <li><a href="https://www.linkedin.com/company/mediax-agencyy/">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <span>© 2026 MediaX Agency. All rights reserved.</span>
          <span><a href="/terms-condition">Terms</a> · <a href="/privacy">Privacy</a></span>
        </div>
      </div>
    </footer>

    </>
  );
}

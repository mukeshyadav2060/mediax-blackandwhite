import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import QuoteSlider from "@/components/QuoteSlider";
import Footer from "@/components/Footer";
import HowSteps from "@/components/HowSteps";
import { Count, Loader, Reveal, SmoothScroll, Split } from "@/components/Motion";
import data from "@/data/plans.json";
import { clients, steps, testimonials } from "@/data/content";

// white-on-transparent client logos: shown on a dark tile so they stay visible
const DARK_LOGOS = new Set(["1-centralis", "2-xypher", "4-bemine", "16-vameon", "21-rocky-rabbit", "23-vector-space", "11-rwa", "33-logo-icon-22"]);
const CAL = "https://calendly.com/mediaxagency/30min";

/* "View the work ————•" style link */
const Ln = ({ href, children }: { href: string; children: React.ReactNode }) => <a className="ln" href={href}><b>{children}</b><i /></a>;

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />

        {/* Pricing */}
        <section id="pricing" className="sec mn pricing-sec">
          <div className="wrap">
            <div className="mn-head">
              <Split as="h2" className="display h-m" text={"Choose your package"} />
              <Reveal as="p" className="sub">Tap a package to see exactly which outlets it covers.</Reveal>
            </div>
            <Pricing />
          </div>
        </section>

        {/* Outlets */}
        <section className="logos">
          <p className="lbl-s center">Published on the outlets your audience reads</p>
          <div className="marquee-logos">
            <div className="track">
              {[0, 1].map((k) => data.publishers.map((p) => (
                <div className="tile" key={`${k}-${p.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo.src} alt={k ? "" : p.name} width={p.logo.width} height={p.logo.height} />
                </div>
              )))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="sec mn">
          <div className="wrap">
            <HowSteps steps={steps}>
              <p className="lbl-s how-lbl">Process</p>
              <Split as="h2" className="display h-m" text={"How it works"} />
            </HowSteps>
          </div>
        </section>

        {/* Trusted by + featured quote */}
        <section id="clients" className="sec mn clients">
          <div className="wrap g12">
            <p className="lbl-s">Clients</p>
            <h2 className="display h-m mn-title"><Count to={1400} suffix="+" /> crypto and Web3 projects trust MediaX</h2>
            <div className="mn-body"><QuoteSlider /></div>
          </div>
          <div className="marquee-logos tall">
            <div className="track slow">
              {[0, 1].map((k) => clients.map((c) => (
                <div className={DARK_LOGOS.has(c) ? "tile sq dk" : "tile sq"} key={`${k}-${c}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/media/client-${c}.webp`} alt="" loading="lazy" />
                </div>
              )))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec mn faq-sec">
          <div className="wrap g12">
            <p className="lbl-s">FAQ</p>
            <div className="mn-title">
              <Split as="h2" className="display h-m" text={"Questions before you buy?"} />
              <Reveal as="p" className="sub">Book a 30-minute call and we’ll help you choose.</Reveal>
              <Reveal><Ln href={CAL}>Book a call</Ln></Reveal>
            </div>
            <div className="mn-body"><Faq /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

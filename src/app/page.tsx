import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkCards from "@/components/WorkCards";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { Count, Loader, Reveal, SmoothScroll, Split } from "@/components/Motion";
import data from "@/data/plans.json";
import { clients, faqs, footer, marquee, posts, resourceTags, services, steps, works } from "@/data/content";

// white-on-transparent client logos: shown on a dark tile so they stay visible
const DARK_LOGOS = new Set(["1-centralis", "2-xypher", "4-bemine", "16-vameon", "21-rocky-rabbit", "23-vector-space", "11-rwa", "33-logo-icon-22"]);
const CAL = "https://calendly.com/mediaxagency/30min";

function Roll({ children }: { children: string }) {
  return <span className="roll"><span>{children}</span><span aria-hidden>{children}</span></span>;
}

export default function Home() {
  const m = marquee.join(" ● ") + " ● ";
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />

        {/* Outlet logos */}
        <section className="logos">
          <p className="eyebrow center">Guaranteed placements on the outlets your audience reads</p>
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

        {/* Intro */}
        <section id="services" className="sec intro">
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"Strategic PR that elevates\nyour **blockchain brand**"} />
            <div className="intro-grid">
              <Reveal as="p" className="lead">We combine expert storytelling, targeted outreach and strong media relationships to amplify your crypto brand.</Reveal>
              <Reveal className="intro-list" delay={120}>
                {services.map((s) => (
                  <div className="row" key={s.n}>
                    <span className="n">{s.n}</span>
                    <div><h3>{s.tag}</h3><p>{s.body}</p></div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Work cards */}
        <section className="sec works-sec" data-dark>
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"One brief,\n**countless headlines**"} />
            <WorkCards items={works} />
          </div>
        </section>

        {/* Marquee */}
        <section className="big-marquee" aria-label="Highlights">
          <div className="track">
            {[0, 1].map((k) => <h2 className="display" key={k} aria-hidden={k === 1}>{m}</h2>)}
          </div>
        </section>

        {/* Proof */}
        <section className="sec proof" data-dark>
          <div className="wrap">
            <Split as="h2" className="display h-l" text={"The crypto PR agency\nweb3 teams rely on"} />
            <div className="stats">
              <Reveal className="stat"><b className="display"><Count to={1400} suffix="+" /></b><p>crypto and Web3 projects trust MediaX with their announcements</p></Reveal>
              <Reveal className="stat" delay={100}><b className="display">24–48<small>h</small></b><p>from your approval to a live release, with express publishing on request</p></Reveal>
              <Reveal className="stat" delay={200}><b className="display"><Count to={600} suffix="+" /></b><p>guaranteed publications in our Diamond package</p></Reveal>
            </div>
            <div className="glass-cards">
              {[["Verified outlets only", "Every placement comes from a verified crypto or mainstream outlet."], ["Guaranteed placements", "All packages include guaranteed press release distribution."], ["Metric reports", "Placements, traffic data and live URLs after every release."]].map(([t, d], i) => (
                <Reveal key={t} className="glass-card" delay={i * 90}><h3 className="display">{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="sec how">
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"One relationship.\n**Countless publications.**"} />
            <Reveal as="p" className="lead">Pick a package, send your story and watch the coverage roll in. Releases go live within 24 to 48 hours of your approval.</Reveal>
            <div className="steps">
              {steps.map((s, i) => (
                <Reveal className="step" key={s.n} delay={i * 90}>
                  <div className="step-img"><img src={`/media/${s.img}.webp`} alt="" loading="lazy" /></div>
                  <span className="n">0{s.n}</span>
                  <h3 className="display">{s.title}</h3>
                  <p>{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="sec pricing-sec" data-dark>
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"Choose your **package**"} />
            <Reveal as="p" className="lead">Tap a package to see exactly which outlets it covers.</Reveal>
            <Pricing />
          </div>
        </section>

        {/* Spotlight */}
        <section className="spot" data-dark>
          <div className="spot-bg" aria-hidden />
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"Built for Web3.\n**Never one-size-fits-all.**"} />
            <Reveal as="p" className="lead">From token launches and funding rounds to exchange listings and rebrands, every story is shaped for the crypto audience that reads it.</Reveal>
            <Reveal><a className="btn white" href="/submit-press-release"><Roll>Submit your press release</Roll></a></Reveal>
          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="sec clients">
          <div className="wrap"><Split as="h2" className="display h-l" text={"Trusted by over **1,400+** crypto\nand Web3 projects worldwide"} /></div>
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

        {/* Reviews */}
        <section className="sec reviews-sec">
          <div className="wrap">
            <Split as="h2" className="display h-xl" text={"What our\n**clients say**"} />
            <Reveal as="p" className="lead">Discover how MediaX has helped Web3, DeFi, NFT, and blockchain projects gain real traction, visibility, and results.</Reveal>
          </div>
          <Reviews />
        </section>

        {/* Resources */}
        <section id="blog" className="sec">
          <div className="wrap">
            <div className="head-row">
              <Split as="h2" className="display h-xl" text={"Latest from\nthe **blog**"} />
              <Reveal><a className="btn dark-outline" href="/blogs"><Roll>See all posts</Roll></a></Reveal>
            </div>
            <div className="posts">
              {posts.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <a className="post" href={p.href}>
                    <span className="tag">{resourceTags[i]}</span>
                    <h3 className="display">{p.title}</h3>
                    <span className="go">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec faq-sec">
          <div className="wrap faq-grid">
            <div className="faq-head">
              <Split as="h2" className="display h-xl" text={"Questions,\n**answered**"} />
              <Reveal as="p" className="lead">Still curious? Book a 30-minute call with our team.</Reveal>
              <Reveal><a className="btn purple" href={CAL}><Roll>Book a call</Roll></a></Reveal>
            </div>
            <Faq />
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }) }} />
        </section>
      </main>

      <Footer />
    </>
  );
}

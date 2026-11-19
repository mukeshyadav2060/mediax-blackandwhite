/* dedicated heroes for the five pages that do a different job from the rest.
   Every other inner page uses the shared <PageHero>. */
import { Count, Reveal, Split } from "./Motion";
import { Crumbs } from "./PageHero";
import ContactForm from "./ContactForm";
import OutletWall from "./OutletWall";
import LocalTime from "./LocalTime";
import { packages } from "@/data/packages";
import { posts, proof } from "@/data/content";
import { articles, type Page } from "@/data/pages";
import plans from "@/data/plans.json";

const CAL = "https://calendly.com/mediaxagency/30min";
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const Grid = () => <div className="ph-grid" aria-hidden />;
const Ctas = ({ cta, center }: { cta?: [string, string][]; center?: boolean }) =>
  cta ? <Reveal className={center ? "btn-row center" : "btn-row"}>{cta.map(([l, h], i) => <a key={l} href={h} className={i ? "btn glass" : "btn ink"}>{l}</a>)}</Reveal> : null;

/* ---------- pricing: centred headline over a five-stop price scale ---------- */
export function PricingHero({ page }: { page: Page }) {
  return (
    <section className="phero ph2 phx phx-price">
      <Grid />
      <div className="wrap">
        <div className="phx-c">
          <Crumbs current={page.eyebrow} />
          <Split as="h1" className="display h-xl" text={page.title} />
          <Reveal as="p" className="lead">{page.lead}</Reveal>
        </div>
        <Reveal as="ol" className="scale" delay={150} >
          {packages.map((p, i) => (
            <li key={p.id} style={{ ["--i" as string]: i }}>
              <a href={`/submit-press-release?package=${p.id}`}>
                <i className="dot" aria-hidden />
                <b>{p.name}</b>
                <em>{fmt(p.price)}</em>
                <span>{p.stats[0].n}{p.stats[0].suf} publications</span>
              </a>
            </li>
          ))}
        </Reveal>
        <Ctas cta={page.cta} center />
      </div>
    </section>
  );
}

/* ---------- publications: headline + giant outlet count, the outlet wall below ---------- */
export function PublicationsHero({ page }: { page: Page }) {
  const outlets = new Set(plans.publishers.map((p) => p.name.toLowerCase().replace(/[^a-z]/g, ""))).size;
  return (
    <section className="phero ph2 phx phx-pubs">
      <Grid />
      <div className="wrap ph-in">
        <div className="ph-main">
          <Crumbs current={page.eyebrow} />
          <Split as="h1" className="display h-xl" text={page.title} />
          <Reveal as="p" className="lead">{page.lead}</Reveal>
          <Ctas cta={page.cta} />
        </div>
        <Reveal className="phx-count" delay={150}>
          <b className="display"><Count to={outlets} /></b>
          <p>premium crypto and finance outlets, plus hundreds of syndicated sites</p>
          <ul>
            <li><span>Guaranteed per package</span><b>500–600+</b></li>
            <li><span>Packages</span><b>{packages.length}, from {fmt(packages[0].price)}</b></li>
          </ul>
        </Reveal>
      </div>
      <div className="phx-wall"><OutletWall /></div>
    </section>
  );
}

/* ---------- about: one big statement, then intro · offices (live time) · numbers ---------- */
export function AboutHero({ page }: { page: Page }) {
  return (
    <section className="phero ph2 phx phx-about">
      <Grid />
      <div className="wrap">
        <Crumbs current={page.eyebrow} />
        <Split as="h1" className="display phx-big" text={page.title} />
        <div className="phx-row">
          <Reveal className="phx-col">
            <p className="phx-k">Who we are</p>
            <p className="lead">{page.lead}</p>
            <Ctas cta={page.cta} />
          </Reveal>
          <Reveal className="phx-col" delay={100}>
            <p className="phx-k">Offices</p>
            <ul className="phx-offices">
              <li><b>Dubai</b><span>Al Mankhool, Bur Dubai</span><LocalTime tz="Asia/Dubai" label="GST" /></li>
              <li><b>Kolkata</b><span>Salt Lake, Kolkata 700091</span><LocalTime tz="Asia/Kolkata" label="IST" /></li>
            </ul>
          </Reveal>
          <Reveal className="phx-col" delay={200}>
            <p className="phx-k">In numbers</p>
            <dl className="phx-nums">
              {proof.map(([n, pre, suf, l]) => <div key={l}><dt>{pre}{n.toLocaleString("en-US")}{suf}</dt><dd>{l}</dd></div>)}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- contact: the form is the hero, channels beside it ---------- */
export function ContactHero({ page }: { page: Page }) {
  return (
    <section className="phero ph2 phx phx-contact">
      <Grid />
      <div className="wrap ph-in">
        <div className="ph-main">
          <Crumbs current={page.eyebrow} />
          <Split as="h1" className="display h-xl" text={page.title} />
          <Reveal as="p" className="lead">{page.lead}</Reveal>
          <Reveal as="ul" className="phx-ch">
            <li><a href="mailto:contact@mediax.agency"><span>Email</span><b>contact@mediax.agency</b><i aria-hidden>→</i></a></li>
            <li><a href="https://t.me/MediaxPR"><span>Telegram</span><b>@MediaxPR</b><i aria-hidden>→</i></a></li>
            <li><a href={CAL}><span>Call</span><b>Book a 30-minute call</b><i aria-hidden>→</i></a></li>
            <li><div><span>Offices</span><b>Dubai · Kolkata</b></div></li>
          </Reveal>
          <Reveal><a className="ph-verify dk" href="/verify-team">Got a message from “MediaX”? Verify it’s us →</a></Reveal>
        </div>
        <Reveal className="phx-form" delay={150}><ContactForm formOnly /></Reveal>
      </div>
    </section>
  );
}

/* ---------- blog: latest article featured beside the headline ---------- */
export function BlogHero({ page }: { page: Page }) {
  const href = posts[0].href, a = articles[href.replace("/blogs/", "")];
  return (
    <section className="phero ph2 phx phx-blog">
      <Grid />
      <div className="wrap ph-in">
        <div className="ph-main">
          <Crumbs current={page.eyebrow} />
          <Split as="h1" className="display h-xl" text={page.title} />
          <Reveal as="p" className="lead">{page.lead}</Reveal>
          <Ctas cta={page.cta} />
        </div>
        <Reveal delay={150}>
          <a className="ph-card ph-ink phx-feat" href={href}>
            <p className="ph-lab"><span>Latest · {a.tag}</span><span>{a.read}</span></p>
            <h2>{a.title}</h2>
            <p className="phx-ex">{a.body[0].p}</p>
            <span className="phx-go">Read the article <i aria-hidden>→</i></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

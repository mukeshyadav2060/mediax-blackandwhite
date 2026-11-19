import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageView from "./PageView";
import PageHero from "./PageHero";
import Header from "./Header";
import Footer from "./Footer";
import { SmoothScroll } from "./Motion";
import { articles, landings, pages } from "@/data/pages";
import { posts } from "@/data/content";

export function routeMeta(key: string): Metadata {
  const a = articles[key.replace(/^blogs\//, "")];
  const t = key.startsWith("blogs/") && a ? a.title : (pages[key] ?? landings[key])?.title.replace(/\*\*/g, "");
  return t ? { title: `${t} — MediaX` } : {};
}

export default function Route({ k }: { k: string }) {
  const article = k.startsWith("blogs/") ? k.slice(6) : null;
  if (article && articles[article]) {
    const a = articles[article];
    const others = posts.filter((p) => !p.href.endsWith(article));
    return (
      <>
        <SmoothScroll />
        <Header />
        <main>
          <PageHero eyebrow={a.tag} title={a.title} lead={a.read} crumbs={[["Home", "/"], ["Blog", "/blogs"]]} />
          <section className="ss"><div className="wrap">
            <article className="prose art">
              {a.body.map((b, i) => <div key={i}>{b.h && <h2>{b.h}</h2>}<p>{b.p}</p></div>)}
              <a className="btn purple" href="/submit-press-release">Submit your press release</a>
            </article>
          </div></section>
          <section className="ss alt"><div className="wrap">
            <h2 className="display h-m">More <strong>reading</strong></h2>
            <div className="posts">{others.map((p) => <a className="post" key={p.href} href={p.href}><span className="tag">Read</span><h3 className="display">{p.title}</h3><span className="go">↗</span></a>)}</div>
          </div></section>
        </main>
        <Footer />
      </>
    );
  }
  const page = pages[k] ?? landings[k];
  if (!page) notFound();
  return <PageView page={page} k={k} />;
}

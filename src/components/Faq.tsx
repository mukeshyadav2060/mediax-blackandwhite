"use client";
import { useState } from "react";
import { faqs } from "@/data/content";

export default function Faq({ initial = 4 }: { initial?: number }) {
  const [o, setO] = useState<number | null>(0);
  const [all, setAll] = useState(false);
  const list = all ? faqs : faqs.slice(0, initial);
  return (
    <div className="faq">
      {list.map(([q, a], i) => (
        <div className={o === i ? "q open" : "q"} key={q}>
          <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{q}</span>
            <i aria-hidden />
          </button>
          <div className="a"><div><p>{a}</p></div></div>
        </div>
      ))}
      {faqs.length > initial && (
        <button className="faq-more" onClick={() => setAll(!all)}>{all ? "Show fewer" : `Show all ${faqs.length} questions`}</button>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { faqs } from "@/data/content";

export default function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <div className="faq">
      {faqs.map(([q, a], i) => (
        <div className={o === i ? "q open" : "q"} key={q}>
          <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{q}</span>
            <i aria-hidden />
          </button>
          <div className="a"><div><p>{a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

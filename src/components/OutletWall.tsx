import plans from "@/data/plans.json";

/* two rows of outlet names, typeset large, drifting in opposite directions */
const ROWS: { ids: string[]; dir: "l" | "r" }[] = [
  { dir: "l", ids: ["cointelegraph", "the-block", "decrypt", "coinmarketcap", "news-bitcoin-com", "be-in-crypto", "u-today", "the-defiant", "bitcoinist", "newsbtc"] },
  { dir: "r", ids: ["business-insider", "apnews", "marketwatch", "investing-com", "benzinga", "morningstar", "street-insider", "hackernoon", "invezz", "cryptobriefing"] },
];
const pub = (id: string) => plans.publishers.find((p) => p.id === id)!;

export default function OutletWall() {
  return (
    <div className="ow">
      {ROWS.map((row) => (
        <div className={`ow-row ${row.dir}`} key={row.dir}>
          <div className="ow-track">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 || undefined}>
                {row.ids.map(pub).map((p) => (
                  <li key={p.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <i><img src={p.logo.src} alt="" loading="lazy" /></i>
                    <span>{p.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

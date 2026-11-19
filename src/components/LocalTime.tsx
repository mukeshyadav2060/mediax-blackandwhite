"use client";
import { useEffect, useState } from "react";

/* live local time for an office, e.g. "14:05 GST". Rendered client-side only to avoid
   a server/client mismatch. */
export default function LocalTime({ tz, label }: { tz: string; label: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [tz]);
  return <span className="lt"><i aria-hidden />{t || "--:--"} {label}</span>;
}

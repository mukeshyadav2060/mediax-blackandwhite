"use client";
import { useState } from "react";

type R = { ok: boolean; msg: string } | null;

/* official channels only */
function check(v: string): R {
  const s = v.trim().toLowerCase();
  if (!s) return null;
  if (s.includes("@") && !s.startsWith("@")) {
    return s.endsWith("@mediax.agency")
      ? { ok: true, msg: "This is an official MediaX email domain. Still, never share seed phrases or private keys with anyone." }
      : { ok: false, msg: "This address is not on the official @mediax.agency domain. Do not pay or share information with it." };
  }
  const h = s.replace(/^(https?:\/\/)?(t\.me\/)?@?/, "");
  return h === "mediaxpr"
    ? { ok: true, msg: "@MediaxPR is MediaX’s official Telegram account." }
    : { ok: false, msg: "This handle is not our official Telegram account (@MediaxPR). Treat it as an impersonator." };
}

export default function VerifyForm() {
  const [v, setV] = useState("");
  const [r, setR] = useState<R>(null);
  return (
    <div className="verify">
      <form className="form-card" onSubmit={(e) => { e.preventDefault(); setR(check(v)); }}>
        <label className="fld"><span className="lbl">Email address or Telegram handle</span>
          <input value={v} onChange={(e) => { setV(e.target.value); setR(null); }} placeholder="name@mediax.agency or @MediaxPR" required />
        </label>
        <button className="btn purple" type="submit">Verify</button>
        {r && <p className={r.ok ? "vr ok" : "vr bad"} role="status"><b>{r.ok ? "Verified" : "Not verified"}</b> {r.msg}</p>}
      </form>
      <ul className="verify-tips">
        <li>We only email from <b>@mediax.agency</b>.</li>
        <li>Our only Telegram account is <b>@MediaxPR</b>.</li>
        <li>We never ask for wallet keys or seed phrases.</li>
        <li>Payments are made only through checkout from our site.</li>
      </ul>
    </div>
  );
}

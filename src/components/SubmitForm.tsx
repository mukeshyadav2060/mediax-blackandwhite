"use client";
import { useEffect, useState } from "react";
import Select from "./Select";
import data from "@/data/plans.json";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
const opts = data.plans.map((p) => ({ value: p.id, label: p.name, hint: fmt(p.price) }));
const countries = ["United States", "United Kingdom", "United Arab Emirates", "Singapore", "Switzerland", "Germany", "India", "Canada", "Australia", "Other"].map((c) => ({ value: c, label: c }));

const Field = ({ label, name, type = "text", area, hint, req = true }: { label: string; name: string; type?: string; area?: boolean; hint?: string; req?: boolean }) => (
  <label className="fld">
    <span className="lbl">{label}{!req && <i> optional</i>}</span>
    {area ? <textarea name={name} rows={name === "content" ? 7 : 4} required={req} /> : <input name={name} type={type} required={req} />}
    {hint && <small>{hint}</small>}
  </label>
);

export default function SubmitForm() {
  const [pkg, setPkg] = useState(opts[0].value);
  const [country, setCountry] = useState(countries[0].value);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(location.search).get("package");
    if (p && opts.some((o) => o.value === p)) setPkg(p);
  }, []);

  const plan = data.plans.find((p) => p.id === pkg)!;

  if (sent) return (
    <div className="form-card done">
      <h2 className="display h-l">Thank you.</h2>
      <p>Your release is in. Our team will review it and send your checkout link shortly.</p>
      <a className="btn purple" href="/">Back to home</a>
    </div>
  );

  return (
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <fieldset><p className="legend">Contact information</p>
        <Field label="Full name" name="name" /><Field label="Email address" name="email" type="email" /><Field label="Telegram ID" name="telegram" />
      </fieldset>
      <fieldset><p className="legend">Press release</p>
        <Field label="Title" name="title" /><Field label="Publishing date" name="date" type="date" />
        <div className="span2"><Field label="Press release content" name="content" area hint="Paste the text here, or a link to it in Google Docs." /></div>
      </fieldset>
      <fieldset><p className="legend">Media contact</p>
        <Field label="Contact person name" name="contact" /><Field label="Business email" name="bemail" type="email" />
        <Select label="Country" name="country" options={countries} value={country} onChange={setCountry} /><Field label="City" name="city" />
      </fieldset>
      <fieldset><p className="legend">Your package</p>
        <div className="span2"><Select label="Package" name="package" options={opts} value={pkg} onChange={setPkg} /></div>
        <div className="span2 pkg-sum" key={pkg}>
          <b>{plan.publications}</b>
          <span>{plan.includes.join(" · ")}</span>
          <strong className="display">{fmt(plan.price)}</strong>
        </div>
        <div className="span2"><Field label="Message" name="message" area req={false} /></div>
      </fieldset>
      <label className="chk"><input type="checkbox" required /><span>I agree to the <a href="/terms-condition">Terms</a> and <a href="/privacy">Privacy policy</a>.</span></label>
      <button className="btn purple big" type="submit">Submit and go to checkout</button>
    </form>
  );
}

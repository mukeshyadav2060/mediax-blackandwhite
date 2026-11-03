"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="form-card done"><h2 className="display h-l">Message sent.</h2><p>Thanks — our team will reply within 24 hours.</p><a className="btn purple" href="/">Back to home</a></div>;
  return (
    <div className="contact-grid">
      <form className="form-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <fieldset>
          <label className="fld"><span className="lbl">Full name</span><input name="name" required /></label>
          <label className="fld"><span className="lbl">Email address</span><input name="email" type="email" required /></label>
          <label className="fld"><span className="lbl">Telegram ID <i>optional</i></span><input name="telegram" /></label>
          <label className="fld"><span className="lbl">Project</span><input name="project" required /></label>
          <label className="fld span2"><span className="lbl">How can we help?</span><textarea name="message" rows={6} required /></label>
        </fieldset>
        <button className="btn purple big" type="submit">Send message</button>
      </form>
      <aside className="contact-side">
        <h3 className="display">Prefer to talk?</h3>
        <a className="btn white" href="https://calendly.com/mediaxagency/30min">Book a 30-min call</a>
        <ul>
          <li><span>Email</span><a href="mailto:contact@mediax.agency">contact@mediax.agency</a></li>
          <li><span>Telegram</span><a href="https://t.me/MediaxPR">@MediaxPR</a></li>
          <li><span>Dubai</span>Al Mankhool, Bur Dubai</li>
          <li><span>India</span>Salt Lake, Kolkata 700091</li>
        </ul>
      </aside>
    </div>
  );
}

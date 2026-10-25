import { useState } from "react";
import { profile } from "../data.js";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState("");

  function send() {
    if (!f.name.trim() || !f.message.trim() || !/\S+@\S+\.\S+/.test(f.email)) {
      setErr("Add your name, a valid email, and a message.");
      return;
    }
    setErr("");
    const body = `${f.message}\n\n- ${f.name} (${f.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
  }
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <section id="contact" className="section contact">
      <p className="scrawl avail">available for freelance and full-time</p>
      <h2 className="lets">Let's build</h2>
      <div className="note paper">
        <span className="tape-l" aria-hidden="true" /><span className="tape-r" aria-hidden="true" />
        <label>Name<input value={f.name} onChange={on("name")} placeholder="Your name" /></label>
        <label>Email<input value={f.email} onChange={on("email")} placeholder="you@email.com" type="email" /></label>
        <label className="wide">Message<textarea rows="3" value={f.message} onChange={on("message")} placeholder="Tell me about your project, idea, or just say hi..." /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="send" onClick={send}>Send message →</button>
      </div>
      <div className="alt">
        <a href={`mailto:${profile.email}`}>Say hello via email</a>
        <a href={profile.callLink}>Book a free call</a>
      </div>
      <p className="giant" aria-hidden="true">{profile.name.toUpperCase()}</p>
    </section>
  );
}

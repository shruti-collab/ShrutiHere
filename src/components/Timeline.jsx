import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data.js";

gsap.registerPlugin(ScrollTrigger);

const TABS = [["all", "Everything"], ["work", "Experience"], ["study", "Education"]];

// A line that draws itself as you scroll; each card lights its dot when it reaches the middle.
export default function Timeline() {
  const root = useRef(null);
  const [tab, setTab] = useState("all");
  const items = timeline.filter((t) => tab === "all" || t.type === tab);

  useEffect(() => {
    const items = root.current.querySelectorAll(".tl-item");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("on"));
      return;
    }
    const mobile = innerWidth < 820;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-list", start: "top 65%", end: "bottom 65%", scrub: true } });
      items.forEach((el, i) => {
        gsap.from(el.querySelector(".tl-card"), {
          x: mobile ? 0 : i % 2 ? 70 : -70, y: mobile ? 40 : 0, rotate: i % 2 ? 3 : -3, autoAlpha: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        ScrollTrigger.create({ trigger: el, start: "top 62%", toggleClass: { targets: el, className: "on" } });
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [tab]);

  return (
    <section id="experience" className="section tl" ref={root}>
      <div className="exp-title">
        <h2 className="sticker-title">Experience &amp; education</h2>
        <p className="scrawl">scroll to draw the line</p>
      </div>
      <div className="tl-tabs" role="tablist" aria-label="Filter timeline">
        {TABS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={`pill ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <ol className="tl-list">
        <div className="tl-line" aria-hidden="true"><div className="tl-fill" /></div>
        {items.map((t) => (
          <li key={t.title} className="tl-item">
            <span className="tl-dot" aria-hidden="true" />
            <article className="paper tl-card">
              <div className="tl-top">
                <small className={`tl-type ${t.type}`}>{t.type === "work" ? "experience" : "education"}</small>
                <span className="stamp">{t.date}</span>
              </div>
              <h3>{t.title}</h3>
              <p className="tl-org">{t.org}</p>
              <p>{t.desc}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

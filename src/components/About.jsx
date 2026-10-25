import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statement, skills } from "../data.js";

gsap.registerPlugin(ScrollTrigger);

const words = (text) =>
  text.split(/(\s+)/).map((w, k) => (w.trim() === "" ? w : <span key={k} className="w">{w}</span>));

export default function About() {
  const root = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // the statement "reads itself" word by word as you scroll
      gsap.fromTo(".statement .w", { opacity: 0.15 }, { opacity: 1, stagger: 0.07, ease: "none", scrollTrigger: { trigger: ".statement", start: "top 82%", end: "bottom 50%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={root}>
      <p className="statement">
        {statement.map((s, i) => (s.h ? <mark key={i} className={`hl ${s.h}`}>{words(s.t)}</mark> : <span key={i}>{words(s.t)}</span>))}
      </p>
      <div className="about-cards">
        <article className="paper skills-card">
          <span className="tape-top" aria-hidden="true" />
          <header><small>Skills and tools</small></header>
          <div className="skill-cols">
            {skills.map((g, i) => (
              <div key={g.group}>
                <h3 className={`scrawl c${i}`}>{g.group}</h3>
                <ul>{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

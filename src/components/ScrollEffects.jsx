import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// One place for all the scroll-driven motion on the page.
export default function ScrollEffects({ ready }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // top progress bar
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => gsap.set(".progress", { scaleX: s.progress }) });

      // generic reveal: things fade and float up as they enter
      gsap.utils.toArray(".section h2, .section .label, .exp-title, .skills-card, .gh-wrap, .gallery-stage, .note, .alt, .avail, .folders-head .hintr").forEach((el) => {
        gsap.from(el, { y: 50, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      // folders fly up in a stagger, then fan out
      gsap.from(".folder", { y: 110, rotate: (i) => (i % 2 ? 6 : -6), autoAlpha: 0, stagger: 0.14, duration: 0.9, ease: "back.out(1.3)", scrollTrigger: { trigger: ".folders", start: "top 85%", once: true } });

      // award cards swing in on the rope
      gsap.from(".award", { y: -60, rotate: (i) => (i % 2 ? 12 : -12), autoAlpha: 0, stagger: 0.12, duration: 1, ease: "elastic.out(1,0.6)", scrollTrigger: { trigger: ".rope", start: "top 85%", once: true } });

      // hero parallax
      gsap.to(".hero-art", { yPercent: -14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-copy", { yPercent: 10, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      // giant name rises
      gsap.from(".giant", { yPercent: 40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".giant", start: "top 105%", end: "top 62%", scrub: true } });

      // marquee leans into the scroll speed
      ScrollTrigger.create({
        onUpdate: (s) => gsap.to(".marquee .track", { skewX: gsap.utils.clamp(-14, 14, s.getVelocity() / -250), duration: 0.4, overwrite: "auto" }),
      });
    });

    let t;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); });
    ro.observe(document.body);
    return () => { ro.disconnect(); clearTimeout(t); ctx.revert(); };
  }, []);

  useEffect(() => { if (ready) ScrollTrigger.refresh(); }, [ready]);
  return <div className="progress" aria-hidden="true" />;
}

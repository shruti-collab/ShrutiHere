import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data.js";
import Placeholder from "./Placeholder.jsx";

const Star = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 4l13 30 33 3-25 22 8 32-29-17-29 17 8-32L4 37l33-3z" fill="#fff" stroke="#111" strokeWidth="3" />
  </svg>
);

export default function Hero({ ready = true }) {
  const root = useRef(null);
  useEffect(() => {
    if (!ready) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-photo", { y: -120, rotate: -10, opacity: 0, duration: 1, ease: "back.out(1.4)" });
      gsap.from(".sticker", { scale: 0, rotate: -40, stagger: 0.15, delay: 0.6, ease: "back.out(2)" });
      gsap.from(".hero-copy > *", { y: 24, opacity: 0, stagger: 0.12, delay: 0.3, duration: 0.7 });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const [a, b, c] = profile.roles;
  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-art">
        <Star className="sticker star" />
        <figure className="hero-photo">
          <div className="hp-img">{profile.photo ? <img src={profile.photo} alt={profile.name} /> : <Placeholder label="your photo" />}</div>
          <figcaption className="scrawl">{profile.photoCaption}</figcaption>
        </figure>
        <span className="sticker chip s1">headphones</span>
        <span className="sticker chip s2">laptop</span>
      </div>

      <div className="hero-copy">
        <p className="scrawl big">hello <span className="circled">there!!</span></p>
        <p className="intro"><span className="blue scrawl">{profile.intro.split(" this")[0]}</span> this{profile.intro.split(" this")[1]}</p>
        <p className="roles"><span className="role-box">{a}</span> / <span className="role-pink">{b}</span> / <span className="role-under">{c}</span></p>
        <p className="based">based in <span className="city">{profile.city}</span>.</p>
        <p className="scrawl hint">psst... start here ↴</p>
        <div className="cta"><a href="#projects">See my work</a><a href="#contact">Drop me a line</a></div>
      </div>
    </section>
  );
}

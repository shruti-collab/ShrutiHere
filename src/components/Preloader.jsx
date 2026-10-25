import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["sketching ideas", "compiling pixels", "pinning polaroids", "waking the butterfly", "shipping it"];
const FAN = [-22, -11, 0, 11, 22];
const TINTS = ["#ffd6c9", "#8ecbff", "#ff9fc4", "#fff0a8", "#cdf3e0"];

// Full-screen intro: polaroids drop in, a counter races to 100, then the screen splits open.
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const tlRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.set(".pre-polaroid", { rotate: (i) => FAN[i], x: (i) => (i - 2) * 38 });
      gsap.set(".pre-bar", { scaleX: 0 });
      const tl = gsap.timeline();
      tlRef.current = tl;
      if (!reduce) {
        tl.from(".pre-polaroid", { y: -700, opacity: 0, rotate: (i) => FAN[i] - 50, stagger: 0.16, duration: 0.9, ease: "back.out(1.5)" }, 0.1);
        tl.to(".pre-polaroid", { y: (i) => (i % 2 ? -16 : 16), duration: 0.55, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.06 }, 1.2);
      }
      tl.to(".pre-bar", { scaleX: 1, duration: reduce ? 0.3 : 2.6, ease: "power2.inOut" }, 0);
      tl.to(obj, {
        v: 100, duration: reduce ? 0.3 : 2.6, ease: "power2.inOut",
        onUpdate: () => { setPct(Math.round(obj.v)); setWord(Math.min(WORDS.length - 1, Math.floor(obj.v / 20.01))); },
      }, 0);
      tl.addLabel("exit", ">0.2");
      tl.to(".pre-count, .pre-word, .pre-skip", { opacity: 0, y: -30, duration: 0.35 }, "exit");
      tl.to(".pre-polaroid", { y: -900, rotate: (i) => FAN[i] * 3, duration: 0.7, ease: "power3.in", stagger: 0.05 }, "exit");
      tl.to(".pre-bar", { opacity: 0, duration: 0.2 }, "exit+=0.45");
      tl.call(onReveal, null, "exit+=0.45");
      tl.to(".pre-panel.top", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "exit+=0.45");
      tl.to(".pre-panel.bottom", { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, "exit+=0.45");
      tl.call(onDone);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => { setPct(100); tlRef.current?.seek("exit"); };

  return (
    <div className="pre" ref={root} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="pre-panel top" />
      <div className="pre-panel bottom" />
      <div className="pre-bar" />
      <div className="pre-center" aria-hidden="true">
        {TINTS.map((c, i) => (
          <div key={i} className="pre-polaroid"><i style={{ background: c }} /></div>
        ))}
      </div>
      <div className="pre-count" aria-hidden="true">{String(pct).padStart(2, "0")}<small>%</small></div>
      <div className="pre-word scrawl" aria-hidden="true">{WORDS[word]}...</div>
      <button className="pre-skip" onClick={skip}>skip intro</button>
    </div>
  );
}

import { useRef, useState } from "react";
import { profile } from "../data.js";

function useAmbient() {
  const s = useRef({ ctx: null, gain: null, el: null });
  const [on, setOn] = useState(false);

  function start() {
    if (profile.audioSrc) {
      if (!s.current.el) { s.current.el = new Audio(profile.audioSrc); s.current.el.loop = true; }
      s.current.el.play(); return;
    }
    if (!s.current.ctx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain(); gain.gain.value = 0; gain.connect(ctx.destination);
      const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
      lfo.frequency.value = 0.12; lfoG.gain.value = 0.03; lfo.connect(lfoG); lfoG.connect(gain.gain); lfo.start();
      [220, 277.18, 329.63, 440].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f; o.detune.value = (i - 1.5) * 6;
        const g = ctx.createGain(); g.gain.value = 0.25 / (i + 1); o.connect(g); g.connect(gain); o.start();
      });
      s.current = { ...s.current, ctx, gain };
    }
    s.current.ctx.resume();
    s.current.gain.gain.setTargetAtTime(0.12, s.current.ctx.currentTime, 0.6);
  }
  function stop() {
    if (s.current.el) s.current.el.pause();
    if (s.current.gain) s.current.gain.gain.setTargetAtTime(0, s.current.ctx.currentTime, 0.3);
  }
  return [on, () => { on ? stop() : start(); setOn(!on); }];
}

export default function TopBar({ doodle, setDoodle, openMenu }) {
  const [music, toggleMusic] = useAmbient();
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme !== "light");

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    setDark(!dark);
  }

  return (
    <header className="topbar">
      <a href="#top" className="logo" aria-label="Back to top">✦</a>
      <div className="tools">
        <button onClick={toggleMusic} className="pill" aria-pressed={music}>{music ? "sound on" : "sound off"}</button>
        <button onClick={() => setDoodle(!doodle)} className={`pill ${doodle ? "active" : ""}`} aria-pressed={doodle}>doodle</button>
        <button onClick={toggleTheme} className="pill round" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? "☾" : "☀"}</button>
        <button onClick={openMenu} className="pill round" aria-label="Open menu">≡</button>
      </div>
    </header>
  );
}

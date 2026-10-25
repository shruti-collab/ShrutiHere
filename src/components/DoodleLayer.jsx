import { useEffect, useRef, useState } from "react";

const COLORS = ["#8ecbff", "#ff5fa2", "#ffffff"];

// Draw anywhere on the page while Doodle mode is on.
export default function DoodleLayer({ active }) {
  const ref = useRef(null);
  const [color, setColor] = useState(COLORS[1]);
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const resize = () => {
      const img = ctx.getImageData(0, 0, c.width, c.height);
      c.width = innerWidth; c.height = innerHeight;
      ctx.putImageData(img, 0, 0);
    };
    c.width = innerWidth; c.height = innerHeight;
    addEventListener("resize", resize);
    let drawing = false;
    const pos = (e) => ({ x: e.clientX, y: e.clientY });
    const down = (e) => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); c.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (!drawing) return;
      const p = pos(e);
      ctx.strokeStyle = colorRef.current; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.lineTo(p.x, p.y); ctx.stroke();
    };
    const up = () => { drawing = false; };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointerleave", up);
    return () => { removeEventListener("resize", resize); c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); c.removeEventListener("pointerleave", up); };
  }, []);

  const clear = () => { const c = ref.current; c.getContext("2d").clearRect(0, 0, c.width, c.height); };

  return (
    <>
      <canvas ref={ref} className={`doodle ${active ? "on" : ""}`} aria-hidden="true" />
      {active && (
        <div className="doodle-tools">
          {COLORS.map((c) => (
            <button key={c} aria-label={`Pen color ${c}`} className={`swatch ${c === color ? "sel" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
          ))}
          <button className="clear" onClick={clear} aria-label="Clear doodles">clear</button>
        </div>
      )}
    </>
  );
}

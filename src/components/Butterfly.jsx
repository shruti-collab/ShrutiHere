import { useEffect, useRef } from "react";

// Original canvas butterfly that drifts after your cursor.
export default function Butterfly() {
  const ref = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, raf;
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
    const m = { x: w * 0.7, y: h * 0.3 };
    const b = { x: w * 0.7, y: h * 0.3, a: 0 };
    const move = (e) => { m.x = e.clientX; m.y = e.clientY; };
    addEventListener("pointermove", move);

    function wing(side, flap, s) {
      ctx.save();
      ctx.scale(side * flap, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(14 * s, -22 * s, 40 * s, -18 * s, 30 * s, 2 * s);
      ctx.bezierCurveTo(26 * s, 12 * s, 10 * s, 10 * s, 0, 2 * s);
      ctx.fillStyle = "rgba(111,190,255,.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(220,240,255,.95)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 2 * s);
      ctx.bezierCurveTo(10 * s, 6 * s, 20 * s, 22 * s, 8 * s, 24 * s);
      ctx.bezierCurveTo(2 * s, 22 * s, 0, 12 * s, 0, 2 * s);
      ctx.fillStyle = "rgba(70,140,230,.9)";
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function tick(t) {
      ctx.clearRect(0, 0, w, h);
      const tx = m.x + Math.sin(t / 700) * 60 + 50;
      const ty = m.y + Math.cos(t / 500) * 40 - 50;
      const dx = tx - b.x, dy = ty - b.y;
      b.x += dx * 0.03; b.y += dy * 0.03;
      const target = Math.atan2(dy, dx) + Math.PI / 2;
      let d = target - b.a;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      b.a += d * 0.08;
      const flap = 0.25 + Math.abs(Math.sin(t / 70)) * 0.75;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a);
      wing(1, flap, 0.9); wing(-1, flap, 0.9);
      ctx.fillStyle = "#e8f4ff";
      ctx.fillRect(-1.5, -8, 3, 22);
      ctx.restore();
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);

  return <canvas ref={ref} className="butterfly" aria-hidden="true" />;
}

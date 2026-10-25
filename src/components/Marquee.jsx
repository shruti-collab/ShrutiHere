import { profile } from "../data.js";

export default function Marquee() {
  const row = [...profile.marquee, ...profile.marquee, ...profile.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{row.map((t, i) => <span key={i}>{t}<i> ✦ </i></span>)}</div>
    </div>
  );
}

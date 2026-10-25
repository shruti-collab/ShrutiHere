import { profile } from "../data.js";

export default function SideSocials() {
  return (
    <aside className="side" aria-label="Social links">
      {profile.socials.map((s) => (
        <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>{s.short}</a>
      ))}
    </aside>
  );
}

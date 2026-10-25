import { nav } from "../data.js";

export default function MenuOverlay({ open, close }) {
  return (
    <div className={`menu ${open ? "open" : ""}`} aria-hidden={!open} onClick={close}>
      <nav onClick={(e) => e.stopPropagation()} aria-label="Site">
        {nav.map((n, i) => (
          <a key={n} href={n === "Home" ? "#top" : `#${n.toLowerCase()}`} onClick={close}>
            <small>{String(i + 1).padStart(2, "0")}</small>{n}
          </a>
        ))}
      </nav>
    </div>
  );
}

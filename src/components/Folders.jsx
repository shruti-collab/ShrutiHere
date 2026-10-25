import { folders } from "../data.js";

export default function Folders() {
  return (
    <section id="projects" className="section">
      <small className="label">Selected work</small>
      <div className="folders-head">
        <h2>Four corners of<br />my work.</h2>
        <p className="scrawl hintr">hover a folder and snoop around ↓</p>
      </div>
      <div className="folders">
        {folders.map((f, i) => (
          <a key={f.name} href="#projects" className={`folder ${f.tone}`}>
            <span className="papers" aria-hidden="true">{[0, 1, 2].map((k) => <i key={k} style={f.thumbs?.[k] ? { backgroundImage: `url(${f.thumbs[k]})` } : undefined} />)}</span>
            <span className="front">
              <b>{f.name}</b>
              <em>{f.files} files</em>
              <span className="open">Open folder →</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

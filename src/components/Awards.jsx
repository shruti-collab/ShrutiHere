import { awards } from "../data.js";

export default function Awards() {
  return (
    <section id="achievements" className="section awards">
      <div className="exp-title">
        <h2 className="sticker-title">Awards &amp; achievements</h2>
        <p className="scrawl">fresh off the line</p>
      </div>
      <div className="line-wrap" tabIndex={0} aria-label="Awards, scroll sideways">
        <div className="rope" aria-hidden="true" />
        <div className="cards">
          {awards.map((a, i) => (
            <article key={a.title} className="paper award" style={{ "--r": `${(i % 2 ? 1 : -1) * (1 + (i % 3) * 0.6)}deg` }}>
              <span className="peg" aria-hidden="true" />
              <small className="tag">{a.tag}</small>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <small className="meta">{a.meta}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

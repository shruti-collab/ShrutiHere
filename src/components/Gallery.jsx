import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";
import { gallery } from "../data.js";

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <small className="label">Off the screen</small>
      <div className="folders-head">
        <h2>Moments, pegged up.</h2>
        <p className="scrawl hintr">drag the line, or use the arrows</p>
      </div>
      <div className="gallery-stage">
        <PolaroidLineCarousel
          slides={gallery}
          height="clamp(520px, 78vh, 700px)"
          background="var(--color-background)"
          ink="var(--color-foreground)"
          ariaLabel="Photo gallery"
        />
      </div>
    </section>
  );
}

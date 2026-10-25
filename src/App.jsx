import { useEffect, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import ScrollEffects from "./components/ScrollEffects.jsx";
import Background from "./components/Background.jsx";
import Butterfly from "./components/Butterfly.jsx";
import DoodleLayer from "./components/DoodleLayer.jsx";
import TopBar from "./components/TopBar.jsx";
import MenuOverlay from "./components/MenuOverlay.jsx";
import SideSocials from "./components/SideSocials.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import GithubSection from "./components/GithubSection.jsx";
import Folders from "./components/Folders.jsx";
import Timeline from "./components/Timeline.jsx";
import Awards from "./components/Awards.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [menu, setMenu] = useState(false);
  const [doodle, setDoodle] = useState(false);
  const [ready, setReady] = useState(false); // loader started opening
  const [done, setDone] = useState(false); // loader fully gone

  useEffect(() => {
    document.body.style.overflow = menu || !ready ? "hidden" : "";
  }, [menu, ready]);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
  const onKey = (e) => { if (e.key === "Escape") setDoodle(false); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

  return (
    <>
      {!done && <Preloader onReveal={() => setReady(true)} onDone={() => setDone(true)} />}
      <ScrollEffects ready={ready} />
      <Background />
      <Butterfly />
      <DoodleLayer active={doodle} />
      <TopBar doodle={doodle} setDoodle={setDoodle} openMenu={() => setMenu(true)} />
      <MenuOverlay open={menu} close={() => setMenu(false)} />
      <SideSocials />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <GithubSection />
        <Folders />
        <Timeline />
        <Awards />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}

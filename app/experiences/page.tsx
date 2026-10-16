import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { EXPERIENCES } from "@/lib/experiences";

export const metadata = {
  title: "Experiences",
  description: "Dining, sports bar, pool, fitness and entertainment at Malory, Westlands Nairobi. [Draft — pending hotel verification]",
};

export default function ExperiencesPage() {
  return (
    <main>
      <div className="wrap page-head">
        <span className="eyebrow">Experiences</span>
        <h1>Days at Malory, evenings in Westlands</h1>
        <p>Everything the hotel offers under one roof — food, drink, sport, rest and practical services. Each section is written as the final copy will read; the hotel confirms every detail before launch.</p>
      </div>
      <section style={{ paddingTop: 10 }}><div className="wrap">
        {EXPERIENCES.map((e, i) => (
          <div className="two-col" key={e.title} style={{ alignItems: "center", marginBottom: "clamp(56px,8vw,96px)" }}>
            <Reveal type="clip"><div className="ph-media wide">
              {e.img ? <img src={e.img} alt={e.alt} loading="lazy" /> : <span className="ph-tag">[IMG:{e.title.toUpperCase()} — photo to be added]</span>}
            </div></Reveal>
            <div>
              <Reveal type="fade"><span className="eyebrow">{e.eyebrow}</span></Reveal>
              <Reveal type="up"><h2 style={{ fontSize: "clamp(26px,3.2vw,40px)", color: "var(--forest)", margin: "8px 0 14px" }}>{e.title}</h2></Reveal>
              {e.body.map((p, j) => <Reveal key={j} type="fade" delay={0.1 * (j + 1)}><p style={{ color: "rgba(41,43,39,.78)", marginBottom: 12 }}>{p}</p></Reveal>)}
              <Reveal type="fade" delay={0.3}><p className="notice" style={{ marginTop: 14 }}><b>Status:</b> draft copy — the hotel confirms details before this is published.</p></Reveal>
            </div>
          </div>
        ))}
        <Reveal type="fade"><p style={{ textAlign: "center" }}>
          <Link className="btn btn-forest" href="/book">Book your stay</Link></p></Reveal>
      </div></section>
    </main>
  );
}

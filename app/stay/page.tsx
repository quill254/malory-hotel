import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: "Compare Malory's rooms and suites. Live availability and direct booking.",
};
type Room = { id: string; name: string; spec: string; rate: string; img: string; photo?: string };

const rooms: Room[] = [
  { id: "standard", name: "Malory Standard Room", spec: "Queen bed · 2 guests · 24 m²", rate: "KSh 7,000", img: "#D9DED3" },
  { id: "deluxe", name: "Malory Deluxe Room", spec: "King bed · 2 guests · 32 m²", rate: "KSh 10,500", img: "#E7DFCE" },
  { id: "twin", name: "Malory Twin Room", spec: "Two single beds · 2 guests · 28 m²", rate: "KSh 9,000", img: "#DCE2D6" },
  { id: "family", name: "Malory Family Suite", spec: "Two queen beds · 4 guests · 45 m²", rate: "KSh 15,000", img: "#EFE6D4" },
  { id: "executive", name: "Malory Executive Suite", spec: "King bed · 2 guests · 58 m²", rate: "KSh 20,000", img: "#F3ECE0" },
];


export default function Stay() {
  return (
    <main>
      <div className="wrap page-head">
        <span className="eyebrow">Stay</span>
        <h1>Rooms &amp; suites</h1>
        <p>[One line on the room collection — placeholder. Three sample categories; replace with the real inventory.]</p>
      </div>
      <section style={{ paddingTop: 20 }}><div className="wrap">
        <div className="rooms">
          {rooms.map((r) => (
            <article className="room" key={r.id}>
              <div className="ph-media" style={{ borderRadius: 0, aspectRatio: "4/3", background: r.img }}>
                {r.photo ? <img src={r.photo} alt="Temporary reference photo" loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} /> : <span className="ph-tag">[IMG:{r.id.toUpperCase()} — photo to be added]</span>}</div>
              <div className="rm"><h3>{r.name}</h3>
                <p className="spec">{r.spec}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <span className="price">from {r.rate} <small>/ night</small></span>
                  <Link className="btn btn-forest" href={`/room/${r.id}`} style={{ padding: "9px 18px" }}>View room</Link>
                </div></div>
            </article>
          ))}
        </div>
        <p className="notice" style={{ marginTop: 28 }}>Prices shown are [SAMPLE] values for this prototype. The live system must display rates from the booking engine for the guest&apos;s exact dates — never hard-coded prices.</p>
      </div></section>
    </main>
  );
}

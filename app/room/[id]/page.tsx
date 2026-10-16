import Link from "next/link";
import { CATALOG, KES } from "@/lib/booking";

export function generateStaticParams() {
  return CATALOG.map((r) => ({ id: r.id }));
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const r = CATALOG.find((x) => x.id === params.id) ?? CATALOG[0];
  return (
    <main>
      <div className="wrap page-head" style={{ paddingBottom: 20 }}>
        <span className="eyebrow"><Link className="lnk" href="/stay">← All rooms</Link></span>
        <h1>{r.name}</h1>
        <p>{r.bed} · sleeps {r.occ} · {r.size} m²</p>
      </div>
      <section style={{ paddingTop: 10 }}><div className="wrap two-col" style={{ alignItems: "start" }}>
        <div>
          <div className="ph-media" style={{ aspectRatio: "4/3", background: r.img }}>
            <span className="ph-tag">[IMG:{r.id.toUpperCase()}.GALLERY.1–5 — accessible carousel]</span></div>
          <p style={{ marginTop: 22, color: "rgba(41,43,39,.78)" }}>{r.desc}</p>
          <h3 style={{ fontSize: 22, color: "var(--forest)", margin: "26px 0 10px" }}>Amenities</h3>
          <ul style={{ columns: 2, fontSize: 14, color: "rgba(41,43,39,.75)", listStyle: "none" }}>
            <li>— [Wi-Fi]</li><li>— [Smart TV]</li><li>— [Minibar — verify]</li>
            <li>— [Coffee/tea station]</li><li>— [In-room safe]</li><li>— [Air conditioning]</li>
          </ul>
          <p className="notice" style={{ marginTop: 22 }}>Accessibility: [step-free access? roll-in shower? — verify before publishing, else omit.]</p>
        </div>
        <div className="summary" style={{ position: "sticky", top: 96 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "var(--forest)", marginBottom: 6 }}>
            from {KES(r.rate)} <small style={{ fontWeight: 400, color: "rgba(41,43,39,.55)" }}>/ night · [SAMPLE RATE]</small></p>
          <p style={{ fontSize: 12.5, color: "rgba(41,43,39,.6)", marginBottom: 18 }}>[Taxes &amp; fees shown at checkout — TAX.POLICY placeholder]</p>
          <Link className="btn btn-forest" href={`/book?room=${r.id}`} style={{ width: "100%", textAlign: "center" }}>Check availability</Link>
          <table style={{ marginTop: 18 }}><tbody>
            <tr><td>Cancellation</td><td>[CANCEL.POLICY]</td></tr>
            <tr><td>Check-in</td><td>2:00 PM</td></tr>
            <tr><td>Check-out</td><td>10:00 AM</td></tr>
          </tbody></table>
        </div>
      </div></section>
    </main>
  );
}

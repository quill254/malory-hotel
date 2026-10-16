import Link from "next/link";
import AmenitiesMarquee from "@/components/amenities/AmenitiesMarquee";

const rooms = [
  { id: "standard", name: "Malory Standard Room", spec: "Queen bed · 2 guests · 24 m²", rate: "KSh 7,000", img: "#D9DED3" },
  { id: "deluxe", name: "Malory Deluxe Room", spec: "King bed · 2 guests · 32 m²", rate: "KSh 10,500", img: "#D9DED3" },
  { id: "twin", name: "Malory Twin Room", spec: "Two single beds · 2 guests · 28 m²", rate: "KSh 9,000", img: "#D9DED3" },
  { id: "family", name: "Malory Family Suite", spec: "Two queen beds · 4 guests · 45 m²", rate: "KSh 15,000", img: "#D9DED3" },
  { id: "executive", name: "Malory Executive Suite", spec: "King bed · 2 guests · 58 m²", rate: "KSh 20,000", img: "#D9DED3" },
];

const Ph = ({ tag, style }: { tag: string; style?: React.CSSProperties }) => (
  <div className="ph-media" style={style}><span className="ph-tag">[{tag}]</span></div>
);

export default function Home() {
  return (
    <main>
      <section style={{ height: "100svh", minHeight: 600, padding: 0, position: "relative", overflow: "hidden", background: "var(--forest)" }}>
        <div className="hero-media ph" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(165deg,#26493c,#183D32 45%,#0F2A22)" }}>
          <span className="ph-tag" style={{ color: "rgba(245,240,232,.8)", borderColor: "rgba(245,240,232,.5)", background: "rgba(24,61,50,.35)" }}>[IMG:HERO — dusk exterior, Westlands skyline]</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(24,61,50,.25),rgba(24,61,50,0) 35%,rgba(24,61,50,.82))" }} />
        <div className="wrap" style={{ position: "absolute", left: 0, right: 0, bottom: "clamp(90px,14vh,150px)" }}>
          <span className="eyebrow">Westlands · Nairobi</span>
          <h1 style={{ color: "var(--ivory)", fontSize: "clamp(40px,6.5vw,84px)", maxWidth: "12ch" }}>
            A considered<br />stay in Nairobi.
          </h1>
          <p style={{ color: "rgba(245,240,232,.85)", maxWidth: "46ch", marginTop: 16 }}>Your comfort. Our signature.</p>
          <Link href="/book" className="btn btn-champ" style={{ marginTop: 24 }}>Check availability</Link>
        </div>
      </section>

      <div className="wrap" style={{ position: "relative", zIndex: 5, marginTop: -56 }}>
        <form className="bookbar" action="/book" style={{ opacity: 1 }}>
          <div className="bf"><label>Check-in</label><input type="date" name="ci" defaultValue="2026-11-10" required /></div>
          <div className="bf"><label>Check-out</label><input type="date" name="co" defaultValue="2026-11-13" required /></div>
          <div className="bf"><label>Guests</label><select><option>1 room · 2 adults</option><option>1 room · 1 adult</option></select></div>
          <div className="bf"><label>Room type</label>
            <select name="room"><option value="">Any category</option><option value="standard">Malory Standard Room</option><option value="deluxe">Malory Deluxe Room</option><option value="twin">Malory Twin Room</option><option value="family">Malory Family Suite</option><option value="executive">Malory Executive Suite</option></select>
          </div>
          <button className="bookgo" type="submit">Check availability</button>
        </form>
      </div>

      <section><div className="wrap two-col">
        <div>
          <span className="eyebrow">The hotel</span>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", color: "var(--forest)", margin: "10px 0 18px" }}>Your comfort,<br />our signature.</h2>
          <p style={{ color: "rgba(41,43,39,.78)", maxWidth: "52ch" }}>{"Welcome to Malory Hotel, your destination for comfort, convenience and refined hospitality in Westlands, Nairobi. Designed for business travellers, families and leisure guests, Malory Hotel brings together thoughtfully appointed rooms, welcoming dining experiences, relaxing wellness facilities and versatile event spaces. Whether you are visiting for a short escape, an important business trip or an extended stay, our commitment is to make every visit comfortable, seamless and memorable. At Malory Hotel, your comfort is our signature."}</p>
          <p style={{ marginTop: 16 }}><Link className="lnk" href="/our-story">Read our story →</Link></p>
        </div>
        <Ph tag="IMG:LOBBY — natural materials, soft light" />
      </div></section>

      <section style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><h2>Rooms &amp; suites</h2><Link className="lnk" href="/stay">View all rooms →</Link></div>
        <div className="rooms">
          {rooms.map((r) => (
            <article className="room" key={r.id}>
              <Ph tag={`IMG:${r.id.toUpperCase()}`} style={{ borderRadius: 0, aspectRatio: "4/3", background: r.img }} />
              <div className="rm"><h3>{r.name}</h3><p className="spec">{r.spec}</p>
                <span className="price">from {r.rate} <small>/ night · / night</small></span></div>
            </article>
          ))}
        </div>
      </div></section>

      <section style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><h2>Experiences</h2></div>
        <div className="exp">
          <Link href="/dining" className="chip"><h3>Dining</h3><p>Restaurant &amp; bar</p></Link>
          <Link href="/events" className="chip"><h3>Events</h3><p>Meetings &amp; occasions</p></Link>
          <div className="chip hold"><h3>Pool</h3><p>Pool</p></div>
          <div className="chip hold"><h3>Spa</h3><p>Spa &amp; wellness</p></div>
          <Link href="/long-stays" className="chip"><h3>Long stays</h3><p>Extended visits</p></Link>
        </div>
      </div></section>

      <section style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><h2>Amenities &amp; services</h2><Link className="lnk" href="/experiences">Explore experiences →</Link></div>
        <AmenitiesMarquee />
        <p className="notice" style={{ marginTop: 18 }}>Amenity hours, pricing and details will be shown once the hotel confirms them.</p>
      </div></section>

      <section style={{ paddingTop: 0 }}><div className="wrap two-col">
        <Ph tag="MAP:EMBED — Westlands" />
        <div>
          <span className="eyebrow">Location</span>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", color: "var(--forest)", margin: "10px 0 6px" }}>In the heart of Westlands</h2>
          <p style={{ color: "rgba(41,43,39,.78)" }}>[Street address — to confirm], Westlands, Nairobi</p>
          <ul style={{ listStyle: "none", marginTop: 18 }}>
            <li style={{ padding: "12px 0", borderBottom: "1px solid rgba(41,43,39,.12)", fontSize: 14, display: "flex", justifyContent: "space-between" }}><b style={{ color: "var(--forest)" }}>[Landmark — to confirm]</b><span>[to confirm]</span></li>
            <li style={{ padding: "12px 0", fontSize: 14, display: "flex", justifyContent: "space-between" }}><b style={{ color: "var(--forest)" }}>JKIA Airport</b><span>[to confirm]</span></li>
          </ul>
        </div>
      </div></section>

      <section style={{ background: "var(--forest)", color: "var(--ivory)", textAlign: "center" }}>
        <div className="wrap">
          <span className="eyebrow">Reservations</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", margin: "10px 0 14px" }}>Plan your stay</h2>
          <p style={{ color: "rgba(245,240,232,.8)", marginBottom: 26 }}>Book directly with us for the best available rate.</p>
          <Link className="btn btn-champ" href="/book">Book a stay</Link>
          <Link className="btn btn-ghost" href="/contact" style={{ marginLeft: 12, borderColor: "rgba(245,240,232,.5)" }}>[Phone — to confirm]</Link>
        </div>
      </section>
    </main>
  );
}

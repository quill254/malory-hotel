"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATALOG, KES, availability, createBooking, nights, type Quote } from "@/lib/booking";

type Guest = { name: string; email: string; phone: string; requests?: string };

function BookInner() {
const qs = useSearchParams();
  const pre = qs.get("room");
  const [step, setStep] = useState(pre ? 1 : 0);
  const [ci, setCi] = useState("2026-11-10");
  const [co, setCo] = useState("2026-11-13");
  const [err, setErr] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [roomId, setRoomId] = useState<string | null>(pre);
  const [rate, setRate] = useState<"flex" | "nrf">("flex");
  const [guest, setGuest] = useState<Guest>({ name: "", email: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // demo engine reads localStorage — client-only after hydration

  const steps = ["Search", "Rooms", "Details", "Payment"];
  const room = CATALOG.find((r) => r.id === roomId);
  const effRate = room ? (rate === "nrf" ? Math.round(room.rate * 0.9) : room.rate) : 0;
  const n = nights(ci, co);
  const sub = effRate * n, tax = Math.round(sub * 0.16), total = sub + tax;

  function search(e: React.FormEvent) {
    e.preventDefault();
    if (!ci || !co || co <= ci) { setErr("Check-out must be after check-in."); return; }
    setErr("");
    setQuotes(availability(ci, co));
    setStep(1);
  }
  function pay(e: React.FormEvent) {
    e.preventDefault();
    if (!room) return;
    setBusy(true);
    setTimeout(() => { // demo: simulate provider callback (production: webhook-verified)
      const b = createBooking({ roomId: room.id, room: room.name, qty: 1, ci, co, rate: effRate, total, guest, method: "M-Pesa [demo]" });
      location.href = "/confirmation?ref=" + b.ref;
    }, 900);
  }
  const Summary = () => (
    <div className="summary">
      <table><tbody>
        <tr><td>{room?.name} × 1</td><td>{KES(sub)}</td></tr>
        <tr><td>[Sample taxes 16%]</td><td>{KES(tax)}</td></tr>
        <tr className="tot"><td>Total</td><td>{KES(total)}</td></tr>
      </tbody></table>
      <p style={{ fontSize: 12, color: "rgba(41,43,39,.6)", marginTop: 10 }}>[SAMPLE rates — connect booking engine/PMS before launch.]</p>
    </div>
  );

  return (
    <main>
      <div className="wrap page-head" style={{ paddingBottom: 10 }}>
        <span className="eyebrow">Reservations</span><h1>Book your stay</h1>
      </div>
      <section style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 960 }}>
        <div className="steps">{steps.map((s, i) => <span key={s} className={`step ${i === step ? "on" : ""}`}>{i + 1}. {s}</span>)}</div>

        {step === 0 && (
          <form className="form" onSubmit={search} style={{ maxWidth: "none" }}>
            <div className="row">
              <div className="fld"><label>Check-in</label><input type="date" value={ci} onChange={(e) => setCi(e.target.value)} required /></div>
              <div className="fld"><label>Check-out</label><input type="date" value={co} onChange={(e) => setCo(e.target.value)} required /></div>
            </div>
            {err && <p className="form-err" style={{ display: "block", color: "#9A3B2E" }}>{err}</p>}
            <div><button className="btn btn-forest" type="submit">Check availability</button></div>
            <p className="notice" style={{ marginTop: 20 }}>Demo engine: inventory and rates are samples stored in your browser. Production requires a server-side booking engine/PMS (research report §8–9).</p>
          </form>
        )}

        {step === 1 && mounted && (
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>{ci} → {co} · {n} nights</p>
            <div style={{ display: "grid", gap: 16 }}>
              {(quotes.length ? quotes : availability(ci, co)).map((r) => (
                <div className="room" key={r.id} style={{ display: "grid", gridTemplateColumns: "200px 1fr", opacity: r.avail ? 1 : 0.55 }}>
                  <div className="ph-media" style={{ borderRadius: 0, minHeight: 140, background: r.img }}><span className="ph-tag">[IMG:{r.id.toUpperCase()}]</span></div>
                  <div className="rm">
                    <h3>{r.name}</h3>
                    <p className="spec">{r.bed} · sleeps {r.occ} · {r.size} m² · {r.avail > 0 ? r.avail + " available" : "Sold out"}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <span className="price">{KES(r.total)} <small>/ {r.n} nights incl. taxes</small></span>
                      <button className="btn btn-forest" disabled={!r.avail} onClick={() => { setRoomId(r.id); setStep(2); }}>
                        {r.avail ? "Select" : "Sold out"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14 }}><a className="lnk" href="#" onClick={(e) => { e.preventDefault(); setStep(0); }}>← Start over with different dates</a></p>
          </div>
        )}

        {step === 2 && room && (
          <div>
            <div style={{ marginBottom: 22 }}>
              <h3 style={{ marginBottom: 4 }}>{room.name}</h3>
              <p style={{ fontSize: 13, color: "rgba(41,43,39,.6)" }}>{room.bed} · sleeps {room.occ} · {ci} → {co} · {n} nights</p>
              <div className="rate-row">
                <div className={`rate ${rate === "flex" ? "sel" : ""}`} onClick={() => setRate("flex")}>
                  <h4>Flexible rate</h4><p>[CANCEL.POLICY — free cancellation until 48h before check-in, placeholder]</p>
                  <div className="p">{KES(room.rate)} <small style={{ fontWeight: 400, color: "rgba(41,43,39,.55)" }}>/ night</small></div>
                </div>
                <div className={`rate ${rate === "nrf" ? "sel" : ""}`} onClick={() => setRate("nrf")}>
                  <h4>Non-refundable</h4><p>[Save ~10% — full prepayment, no cancellation, placeholder]</p>
                  <div className="p">{KES(Math.round(room.rate * 0.9))} <small style={{ fontWeight: 400, color: "rgba(41,43,39,.55)" }}>/ night</small></div>
                </div>
              </div>
            </div>
            <div className="two-col" style={{ alignItems: "start", gap: 32 }}>
              <form className="form" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <div className="fld"><label>Full name</label><input required placeholder="[Guest name]" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} /></div>
                <div className="fld"><label>Email</label><input type="email" required placeholder="[guest@email.com]" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} /></div>
                <div className="fld"><label>Phone (incl. country code)</label><input required placeholder="[+254 7XX XXX XXX]" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} /></div>
                <div className="fld"><label>Special requests</label><textarea rows={3} placeholder="[Baby cot, accessibility… — optional]" /></div>
                <label style={{ fontSize: 13, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <input type="checkbox" required style={{ marginTop: 4 }} /> I agree to the [booking &amp; cancellation terms — placeholder]</label>
                <div><button className="btn btn-forest" type="submit">Continue to payment</button></div>
              </form>
              <Summary />
            </div>
          </div>
        )}

        {step === 3 && room && (
          <div className="two-col" style={{ alignItems: "start", gap: 32 }}>
            <form className="form" onSubmit={pay}>
              <div className="fld"><label>Payment method</label>
                <select><option>M-Pesa [provider TBD]</option><option>Card [gateway TBD]</option><option>Pay at hotel [policy TBD]</option></select></div>
              <p className="notice">Demo only — no real transaction occurs. In production, payment confirmation must come from the provider&apos;s verified server-side webhook, not this page (research report §7.3, §10.1).</p>
              <div><button className="btn btn-champ" type="submit" disabled={busy}>{busy ? "Processing…" : `Pay ${KES(total)}`}</button></div>
            </form>
            <Summary />
          </div>
        )}
      </div></section>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookInner />
    </Suspense>
  );
}
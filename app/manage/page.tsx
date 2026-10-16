"use client";
import { useState } from "react";
import { KES, findBooking, cancelBooking, type Booking } from "@/lib/booking";

export default function Manage() {
  const [b, setB] = useState<Booking | null | "none">(null);
  function lookup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as { ref: string; email: string };
    const found = findBooking(d.ref);
    setB(found && found.guest.email.toLowerCase() === d.email.toLowerCase() ? found : "none");
  }
  return (
    <main>
      <div className="wrap page-head">
        <span className="eyebrow">Guest services</span>
        <h1>Manage your booking</h1>
        <p>Look up a reservation by reference and email. [Cancellation policy placeholder: free until 48h before check-in.]</p>
      </div>
      <section style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 640 }}>
        <form className="form" onSubmit={lookup}>
          <div className="fld"><label>Booking reference</label><input name="ref" required placeholder="MLY-XXXXXX" /></div>
          <div className="fld"><label>Email used at booking</label><input name="email" type="email" required placeholder="[guest@email.com]" /></div>
          <div><button className="btn btn-forest" type="submit">Find booking</button></div>
        </form>
        {b === "none" && <p style={{ color: "#9A3B2E", fontSize: 13, marginTop: 24 }}>No booking matches that reference and email.</p>}
        {b && b !== "none" && (
          <div className="summary" style={{ marginTop: 28, maxWidth: 560 }}>
            <p style={{ marginBottom: 12 }}><span className={`badge ${b.status === "cancelled" ? "cancel" : "conf"}`}>{b.status}</span></p>
            <h3 style={{ marginBottom: 10 }}>{b.room}</h3>
            <table><tbody>
              <tr><td>Reference</td><td><b>{b.ref}</b></td></tr>
              <tr><td>Guest</td><td>{b.guest.name}</td></tr>
              <tr><td>Dates</td><td>{b.ci} → {b.co}</td></tr>
              <tr className="tot"><td>Total</td><td>{KES(b.total)}</td></tr>
            </tbody></table>
            {b.status !== "cancelled" && (
              <button className="btn btn-ghost" style={{ marginTop: 16, color: "#9A3B2E", borderColor: "#9A3B2E" }}
                onClick={() => { if (confirm("Cancel this booking? Demo inventory will be released.")) { cancelBooking(b.ref); location.reload(); } }}>
                Cancel booking</button>
            )}
          </div>
        )}
      </div></section>
    </main>
  );
}

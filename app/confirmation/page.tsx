"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { KES, findBooking, type Booking } from "@/lib/booking";

function ConfirmationInner() {
  const ref = useSearchParams().get("ref") ?? "";
  // Hydration fix: localStorage only exists on the client. Render an identical
  // skeleton on server + first client paint, then look up the booking after mount.
  const [b, setB] = useState<Booking | null | "missing">(null);
  useEffect(() => {
    document.title = "Booking confirmation | Malory";
    setB(ref ? findBooking(ref) ?? "missing" : "missing");
  }, [ref]);
  return (
    <main>
      <div className="wrap page-head" style={{ paddingBottom: 10 }}>
        {b === null && (
          <div style={{ minHeight: 220 }}>
            <span className="eyebrow">Reservation</span>
            <h1 style={{ margin: "10px 0 24px" }}>Retrieving your booking…</h1>
            <div className="summary" style={{ maxWidth: 560, minHeight: 140 }} aria-hidden="true" />
          </div>
        )}
        {b && b !== "missing" && (
          <>
            <span className="eyebrow">Reservation confirmed</span>
            <h1 style={{ margin: "10px 0 24px" }}>Asante, {b.guest.name.split(" ")[0]}.</h1>
            <div className="summary" style={{ maxWidth: 560 }}>
              <p style={{ marginBottom: 12 }}><span className={`badge ${b.status === "cancelled" ? "cancel" : "conf"}`}>{b.status}</span></p>
              <h3 style={{ marginBottom: 10 }}>{b.room}</h3>
              <table><tbody>
                <tr><td>Reference</td><td><b>{b.ref}</b></td></tr>
                <tr><td>Guest</td><td>{b.guest.name}</td></tr>
                <tr><td>Check-in</td><td>{b.ci}</td></tr>
                <tr><td>Check-out</td><td>{b.co}</td></tr>
                <tr><td>Payment</td><td>[{b.method} — demo transaction]</td></tr>
                <tr className="tot"><td>Total paid</td><td>{KES(b.total)}</td></tr>
              </tbody></table>
              <p style={{ fontSize: 12.5, color: "rgba(41,43,39,.6)", marginTop: 12 }}>
                A confirmation email/SMS would be sent to {b.guest.email} [notification service TBD].</p>
            </div>
          </>
        )}
        {b === "missing" && (
          <p>Booking not found. <Link className="lnk" href="/manage">Look up a reservation</Link></p>
        )}
      </div>
      <section style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 960 }}>
        <Link className="lnk" href="/">← Back to homepage</Link> · <Link className="lnk" href="/manage">Manage another booking</Link>
      </div></section>
    </main>
  );
}

export default function Confirmation() {
  return (
    <Suspense fallback={null}>
      <ConfirmationInner />
    </Suspense>
  );
}
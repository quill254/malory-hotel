"use client";
import { useEffect, useState } from "react";
import { CATALOG, KES, loadBookings, nights, type Booking } from "@/lib/booking";

// PRODUCTION: this page must be protected by role-based auth and read from the
// server database + booking engine (research report §6.5). The demo reads the
// same client-side store as the booking flow.

type Stats = { active: number; revenue: number; occupancy: number; adr: number; canc: number };

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => setBookings(loadBookings().slice().reverse()), []);
  useEffect(() => { document.title = "Admin dashboard | Malory"; }, []);

  const act = bookings.filter((b) => b.status !== "cancelled");
  const revenue = act.reduce((s, b) => s + b.total, 0);
  const roomNights = act.reduce((s, b) => s + nights(b.ci, b.co) * b.qty, 0);
  const capacity = CATALOG.reduce((s, r) => s + r.units, 0) * 30;
  const stats: Stats = {
    active: act.length,
    revenue,
    occupancy: capacity ? Math.round((roomNights / capacity) * 100) : 0,
    adr: roomNights ? Math.round(revenue / roomNights) : 0,
    canc: bookings.length ? Math.round((bookings.filter((b) => b.status === "cancelled").length / bookings.length) * 100) : 0,
  };

  function setStatus(ref: string, status: Booking["status"]) {
    const all = loadBookings();
    const b = all.find((x) => x.ref === ref);
    if (b) { b.status = status; localStorage.setItem("malory_bookings", JSON.stringify(all)); setBookings(all.slice().reverse()); }
  }
  function exportCsv() {
    const csv = ["ref,guest,email,room,check_in,check_out,status,total",
      ...bookings.map((b) => [b.ref, b.guest.name, b.guest.email, b.room, b.ci, b.co, b.status, b.total].join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "malory-bookings.csv"; a.click();
  }

  const cards: [string, string][] = [
    ["Active reservations", String(stats.active)],
    ["Revenue (demo)", KES(stats.revenue)],
    ["Occupancy (30d)", stats.occupancy + "%"],
    ["ADR", KES(stats.adr)],
    ["Cancellation rate", stats.canc + "%"],
  ];

  return (
    <main>
      <div className="wrap page-head" style={{ paddingBottom: 10 }}>
        <span className="eyebrow">Staff</span>
        <h1>Admin dashboard</h1>
        <p>Demo operations view — production reads from the server database and booking engine, behind role-based access.</p>
      </div>
      <section style={{ paddingTop: 0 }}><div className="wrap" style={{ maxWidth: 1100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 36 }}>
          {cards.map(([l, v]) => (
            <div className="summary" key={l} style={{ padding: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "var(--forest)" }}>{v}</div>
              <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(41,43,39,.55)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="sec-head"><h2>Reservations</h2>
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: "8px 16px" }} onClick={exportCsv}>Export CSV</button></div>
        <div className="summary" style={{ overflowX: "auto" }}>
          {bookings.length === 0 && (
            <p style={{ color: "rgba(41,43,39,.6)", fontSize: 14, padding: "16px 0" }}>
              No reservations yet — <a className="lnk" href="/book">create a test booking</a>.</p>)}
          {bookings.length > 0 && (
            <table style={{ minWidth: 760 }}>
              <thead><tr style={{ textAlign: "left", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(41,43,39,.55)" }}>
                <th style={{ padding: "8px 0" }}>Ref</th><th>Guest</th><th>Room</th><th>Dates</th><th>Status</th>
                <th style={{ textAlign: "right" }}>Total</th><th></th></tr></thead>
              <tbody>{bookings.map((b) => (
                <tr key={b.ref} style={{ fontSize: 13.5, borderTop: "1px solid rgba(41,43,39,.08)" }}>
                  <td style={{ padding: "10px 0" }}><b>{b.ref}</b></td>
                  <td>{b.guest.name}<br /><span style={{ color: "rgba(41,43,39,.55)", fontSize: 12 }}>{b.guest.email}</span></td>
                  <td>{b.room}</td><td>{b.ci} → {b.co}</td>
                  <td><span className={`badge ${b.status === "cancelled" ? "cancel" : "conf"}`}>{b.status.replace("_", " ")}</span></td>
                  <td style={{ textAlign: "right" }}>{KES(b.total)}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {b.status === "confirmed" && <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => setStatus(b.ref, "checked_in")}>Check in</button>}
                    {b.status === "checked_in" && <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => setStatus(b.ref, "checked_out")}>Check out</button>}
                    {["confirmed", "checked_in"].includes(b.status) &&
                      <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11, color: "#9A3B2E", borderColor: "#9A3B2E" }}
                        onClick={() => setStatus(b.ref, "cancelled")}>Cancel</button>}
                  </td></tr>))}</tbody>
            </table>)}
        </div>

        <div className="sec-head" style={{ marginTop: 44 }}><h2>Room inventory</h2></div>
        <div className="rooms" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {CATALOG.map((r) => (
            <div className="summary" key={r.id} style={{ padding: 16 }}>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{r.name}</h3>
              <p style={{ fontSize: 12, color: "rgba(41,43,39,.6)" }}>{KES(r.rate)}/night · {r.units} units</p>
              <p className="notice" style={{ marginTop: 10 }}>Unit counts are edited in the booking engine/PMS in production.</p>
            </div>))}
        </div>
      </div></section>
    </main>
  );
}

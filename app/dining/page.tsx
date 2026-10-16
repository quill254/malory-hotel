import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Dining at Malory', intro: '[One-line dining concept placeholder. Publish only once the restaurant offering is confirmed.]' });

export default function Page() {
  return <SimplePage eyebrow='Eat & drink' h1='Dining' intro='[One-line dining concept placeholder. Publish only once the restaurant offering is confirmed.]'>
<div className="two-col" style={{alignItems:"start"}}><div>
     <h2 style={{fontSize:"clamp(24px,3vw,36px)",color:"var(--forest)",marginBottom:14}}>[RESTAURANT.NAME — TBD]</h2>
     <p style={{color:"rgba(41,43,39,.78)",maxWidth:"52ch"}}>[Cuisine concept placeholder — do not name chefs or signature dishes until verified.]</p>
     <ul style={{listStyle:"none",marginTop:20}}>
       <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14,display:"flex",justifyContent:"space-between"}}><b style={{color:"var(--forest)"}}>Breakfast</b><span>[06:30–10:30 — VERIFY]</span></li>
       <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14,display:"flex",justifyContent:"space-between"}}><b style={{color:"var(--forest)"}}>Lunch</b><span>[12:00–15:00 — VERIFY]</span></li>
       <li style={{padding:"12px 0",fontSize:14,display:"flex",justifyContent:"space-between"}}><b style={{color:"var(--forest)"}}>Dinner</b><span>[18:00–22:30 — VERIFY]</span></li></ul>
     <p style={{marginTop:22}}><Link className="btn btn-forest" href="/contact">Reserve a table</Link></p>
     <p className="notice" style={{marginTop:22}}>Dining reservations are separate from room bookings unless the booking system supports both.</p></div>
     <div className="ph-media tall"><span className="ph-tag">[IMG:DINING.1–4 — food & interior]</span></div></div>
  </SimplePage>;
}

import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Spa & Wellness | Malory', intro: '[HOLD — publish only after facility verification]' });
//
export default function Page() {
  return <SimplePage eyebrow='Malory' h1='Spa & wellness' intro='[HOLD — publish only after facility verification]'>
<div className="chip hold" style={{textAlign:"left",padding:28,maxWidth:640}}><h3>Facility unverified</h3>
    <p style={{marginTop:8}}>Template only. If confirmed: list genuine treatments, duration, prices, hours and booking rules.</p></div>
    <div className="ph-media wide" style={{marginTop:24}}><span className="ph-tag">[IMG:SPA.1–3 — if facility confirmed]</span></div>
  </SimplePage>;
}

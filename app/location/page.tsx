import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Find Malory', intro: '[Directions placeholder — verify address, parking and transfer options before publishing.]' });

export default function Page() {
  return <SimplePage eyebrow='Location' h1='In the heart of Westlands' intro='[Directions placeholder — verify address, parking and transfer options before publishing.]'>
<div className="two-col" style={{alignItems:"start"}}>
     <div className="ph-media wide"><span className="ph-tag">[MAP:EMBED — hotel address to confirm]</span></div>
     <div><p style={{color:"rgba(41,43,39,.78)"}}><b style={{color:"var(--forest)"}}>[Street address — to confirm]</b><br/>Westlands, Nairobi, Kenya</p>
      <ul style={{listStyle:"none",marginTop:18}}>
       <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14,display:"flex",justifyContent:"space-between"}}><b style={{color:"var(--forest)"}}>JKIA Airport</b><span>[N] min — VERIFY</span></li>
       <li style={{padding:"12px 0",fontSize:14,display:"flex",justifyContent:"space-between"}}><b style={{color:"var(--forest)"}}>Nairobi Expressway</b><span>[N] min — VERIFY</span></li></ul>
      <p style={{marginTop:22}}><Link className="btn btn-forest" href="/contact">Arrange an airport transfer [VERIFY]</Link></p></div></div>
  </SimplePage>;
}

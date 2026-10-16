import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Extended Stays', intro: '[Placeholder — extended-stay offer for relocating professionals and long projects.]' });

export default function Page() {
  return <SimplePage eyebrow='Malory' h1='Stay a while' intro='[Placeholder — extended-stay offer for relocating professionals and long projects.]'>
<p style={{color:"rgba(41,43,39,.78)",maxWidth:"52ch"}}>[Publish only if Malory actually accepts long stays.]</p>
    <ul style={{listStyle:"none",marginTop:20}}>
     <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14}}><b style={{color:"var(--forest)"}}>Minimum stay</b> — [7 nights? VERIFY]</li>
     <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14}}><b style={{color:"var(--forest)"}}>Weekly rate</b> — [on request / SAMPLE]</li>
     <li style={{padding:"12px 0",fontSize:14}}><b style={{color:"var(--forest)"}}>Housekeeping & laundry</b> — [VERIFY]</li></ul>
    <p style={{marginTop:22}}><Link className="btn btn-forest" href="/contact">Request a long-stay quote</Link></p>
  </SimplePage>;
}

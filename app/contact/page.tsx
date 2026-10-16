import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Contact & Reservations', intro: '[Reception and reservations contact routes — placeholder.]' });
//
export default function Page() {
  return <SimplePage eyebrow='Malory' h1='We are here to help' intro='[Reception and reservations contact routes — placeholder.]'>
<div className="two-col" style={{alignItems:"start"}}><div>
     <ul style={{listStyle:"none"}}>
      <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14}}><b style={{color:"var(--forest)"}}>Reservations</b><br/>[Phone — to confirm] · malordev@gmail.com</li>
      <li style={{padding:"12px 0",borderBottom:"1px solid rgba(41,43,39,.12)",fontSize:14}}><b style={{color:"var(--forest)"}}>Address</b><br/>[Street address — to confirm], Westlands, Nairobi</li>
      <li style={{padding:"12px 0",fontSize:14}}><b style={{color:"var(--forest)"}}>Reception</b><br/>[24h? VERIFY]</li></ul>
     <p className="notice" style={{marginTop:22}}>[WhatsApp Business line — TBD]</p></div>
     <form className="form"><div className="fld"><label>Name</label><input required/></div>
      <div className="row"><div className="fld"><label>Email</label><input type="email" required/></div>
      <div className="fld"><label>Subject</label><select><option>Reservation</option><option>Events</option><option>Long stay</option></select></div></div>
      <div className="fld"><label>Message</label><textarea rows={5} required/></div>
      <div><button className="btn btn-forest" type="submit">Send message [demo]</button></div></form></div>
  </SimplePage>;
}

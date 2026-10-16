import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Meetings & Events', intro: '[Intro placeholder — corporate planners, weddings, private dining. Verify spaces before publishing.]' });
//
export default function Page() {
  return <SimplePage eyebrow='Gather' h1='Meetings & occasions' intro='[Intro placeholder — corporate planners, weddings, private dining. Verify spaces before publishing.]'>
<p className="notice">Event bookings are quote-based — do not display fake real-time availability for event spaces.</p>
    <div className="rooms" style={{gridTemplateColumns:"1fr 1fr",marginTop:24}}>
     {[1,2].map(i=>(<article className="room" key={i}>
       <div className="ph-media" style={{borderRadius:0,aspectRatio:"16/10"}}><span className="ph-tag">[IMG:SPACE.{i}]</span></div>
       <div className="rm"><h3>[SPACE.{i}.NAME — TBD]</h3>
       <p className="spec">Capacity [N] theatre / [N] banquet · [size] m² · [AV equipment? — verify]</p></div></article>))}</div>
    <h2 style={{fontSize:"clamp(24px,3vw,36px)",color:"var(--forest)",margin:"44px 0 18px"}}>Request a proposal</h2>
    <form className="form"><div className="row">
      <div className="fld"><label>Event date</label><input type="date" required/></div>
      <div className="fld"><label>Estimated guests</label><input type="number" min="1" required/></div></div>
      <div className="row"><div className="fld"><label>Name</label><input required/></div>
      <div className="fld"><label>Email</label><input type="email" required/></div></div>
      <div className="fld"><label>Tell us about your event</label><textarea rows={4}/></div>
      <div><button className="btn btn-forest" type="submit">Send enquiry [demo]</button></div></form>
  </SimplePage>;
}

import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Terms & cancellation policy', intro: '[Booking terms placeholder — must match booking engine configuration.]' });
//
export default function Page() {
  return <SimplePage eyebrow='Legal' h1='Terms & conditions' intro='[Booking terms placeholder — must match booking engine configuration.]'>
<p className="notice">[PLACEHOLDER — rate rules, deposits, check-in/out times, governing law (Kenya).]</p>
    <h2 id="cancel" style={{fontSize:26,color:"var(--forest)",margin:"32px 0 12px"}}>Cancellation policy</h2>
    <p className="notice">[PLACEHOLDER — e.g. free cancellation until 48h before check-in.]</p>
  </SimplePage>;
}

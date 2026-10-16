import Link from "next/link";
import SimplePage, { simpleMetadata } from "@/components/SimplePage";

export const metadata = simpleMetadata({ title: 'Privacy policy', intro: '[Kenya Data Protection Act (2019) compliant policy — placeholder.]' });
//
export default function Page() {
  return <SimplePage eyebrow='Legal' h1='Privacy policy' intro='[Kenya Data Protection Act (2019) compliant policy — placeholder.]'>
<p className="notice">[PLACEHOLDER — guest data, booking data, payment handling, analytics cookies, guest rights.]</p>
  </SimplePage>;
}

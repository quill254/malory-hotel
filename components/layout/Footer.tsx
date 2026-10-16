import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <span className="logo">MALORY</span>
            <p>Westlands, Nairobi, Kenya<br />[Phone — to confirm] · malordev@gmail.com</p>
          </div>
          <div><h4>Hotel</h4>
            <Link href="/stay">Rooms &amp; suites</Link><Link href="/dining">Dining</Link>
            <Link href="/experiences">Experiences</Link>
            <Link href="/events">Events</Link><Link href="/long-stays">Long stays</Link></div>
          <div><h4>Support</h4>
            <Link href="/contact">Contact</Link><Link href="/manage">Manage booking</Link>
            <Link href="/book">Book a stay</Link></div>
          <div><h4>Legal</h4>
            <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
            <Link href="/terms#cancel">Cancellation policy</Link></div>
        </div>
        <div className="ftr-bottom">
          <span>© 2026 Malory Hotel. All rights reserved.</span>
          <span>Westlands · Nairobi · Kenya</span>
        </div>
      </div>
    </footer>
  );
}

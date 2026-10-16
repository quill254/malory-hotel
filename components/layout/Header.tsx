"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/stay", label: "Stay" },
  { href: "/dining", label: "Dining" },
  { href: "/experiences", label: "Experiences" },
  { href: "/events", label: "Events" },
  { href: "/location", label: "Discover" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/"; // only the homepage has a dark hero
  const [solid, setSolid] = useState(!overHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(!overHero || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  return (
    <>
      <header className={`hdr ${solid ? "solid" : ""}`}>
        <div className="hdr-in">
          <Link className="logo" href="/">MALORY</Link>
          <nav className="nav">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <Link className="btn btn-forest" href="/book">Book a stay</Link>
          <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`mmenu ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="x" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link href="/book" onClick={() => setOpen(false)} style={{ color: "var(--champagne)" }}>
          Book a stay
        </Link>
      </div>
    </>
  );
}

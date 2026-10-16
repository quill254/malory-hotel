"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AMENITIES } from "@/lib/experiences";

gsap.registerPlugin(ScrollTrigger);

const S = {
  width: 48, height: 48, viewBox: "0 0 48 48", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

// One simple line icon per amenity. Keys must match AMENITIES titles.
const ICONS: Record<string, React.ReactElement> = {
  "Restaurant & bar": (<svg {...S}><path d="M14 6v10a3 3 0 0 1-6 0V6M11 6v36M32 42V6c-3 2-5 6-5 12h5" /></svg>),
  "Sports bar": (<svg {...S}><rect x="6" y="8" width="36" height="24" rx="2" /><path d="M24 32v8M16 42h16" /><circle cx="24" cy="20" r="5" /></svg>),
  "Swimming pool": (<svg {...S}><path d="M4 30c4-3 8-3 12 0s8 3 12 0 8-3 12 0M4 38c4-3 8-3 12 0s8 3 12 0 8-3 12 0" /><path d="M16 26V12a2 2 0 0 1 4 0M28 26V12a2 2 0 0 1 4 0" /></svg>),
  "Fitness centre": (<svg {...S}><rect x="6" y="19" width="5" height="10" rx="1" /><rect x="11" y="15" width="5" height="18" rx="1" /><path d="M16 24h16" /><rect x="32" y="15" width="5" height="18" rx="1" /><rect x="37" y="19" width="5" height="10" rx="1" /></svg>),
  "Car wash": (<svg {...S}><path d="M8 32h32v6H8z" /><path d="M13 32l4-9h14l4 9" /><circle cx="15" cy="38" r="3" /><circle cx="33" cy="38" r="3" /><path d="M14 10v-4M24 8v-4M34 10v-4" /></svg>),
  "Football & entertainment": (<svg {...S}><circle cx="24" cy="24" r="16" /><polygon points="24,17 30,21.5 27.7,28.5 20.3,28.5 18,21.5" /></svg>),
  "Airport transfers": (<svg {...S}><path d="M24 6v14L6 28v4l18-4v8l-5 4v3l7-2 7 2v-3l-5-4v-8l18 4v-4L24 20" /></svg>),
  "Laundry & dry cleaning": (<svg {...S}><rect x="8" y="6" width="32" height="36" rx="3" /><circle cx="24" cy="28" r="9" /><circle cx="14" cy="13" r="1.5" /><path d="M20 13h8" /></svg>),
  "Business corner": (<svg {...S}><rect x="6" y="16" width="36" height="24" rx="3" /><path d="M18 16v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M6 26h36" /></svg>),
  "High-speed Wi-Fi": (<svg {...S}><path d="M6 19a26 26 0 0 1 36 0M11 25a19 19 0 0 1 26 0M16 31a12 12 0 0 1 16 0" /><circle cx="24" cy="38" r="2.5" fill="currentColor" /></svg>),
  "On-site parking": (<svg {...S}><rect x="8" y="8" width="32" height="32" rx="6" /><path d="M19 34V14h7a6 6 0 0 1 0 12h-7" /></svg>),
  "Concierge & 24h reception": (<svg {...S}><path d="M24 8a2 2 0 0 1 2 2v2a10 10 0 0 1 8 10v8l4 4H10l4-4v-8a10 10 0 0 1 8-10v-2a2 2 0 0 1 2-2z" /><path d="M20 40a4 4 0 0 0 8 0" /></svg>),
};

const FALLBACK = (<svg {...S}><circle cx="24" cy="24" r="16" /></svg>);

function Card({ title, text, hidden = false }: { title: string; text: string; hidden?: boolean }) {
  return (
    <div className="amen-card" aria-hidden={hidden ? "true" : undefined}>
      <span className="amen-icon">{ICONS[title] ?? FALLBACK}</span>
      <div className="amen-body">
        <h4 className="amen-title">{title}</h4>
        <p className="amen-desc">{text}</p>
      </div>
    </div>
  );
}

export default function AmenitiesMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = el.querySelector<HTMLElement>(".amen-track");
    if (!track) return;
    // Stop the CSS animation so GSAP owns the movement.
    track.style.animation = "none";

    // Split each card title into characters once, so they can rise in on hover.
    el.querySelectorAll<HTMLElement>(".amen-title").forEach((p) => {
      if (p.dataset.split) return;
      const text = p.textContent ?? "";
      p.dataset.split = "1";
      p.setAttribute("aria-label", text);
      p.textContent = "";
      Array.from(text).forEach((ch) => {
        if (ch === " ") {
          p.appendChild(document.createTextNode(" "));
          return;
        }
        const span = document.createElement("span");
        span.className = "amen-char";
        span.setAttribute("aria-hidden", "true");
        span.textContent = ch;
        p.appendChild(span);
      });
    });

    const ctx = gsap.context(() => {
      if (reduce) return;
      // Icons reveal with a clip-path wipe as the section scrolls into view (visible set only).
      gsap.fromTo(
        el.querySelectorAll(".amen-card:not([aria-hidden]) .amen-icon"),
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, el);

    // Continuous left-to-right scroll. The track holds two identical sets, so moving
    // from -50% to 0 and repeating forever looks seamless.
    const loop = gsap.fromTo(
      track,
      { xPercent: -50 },
      { xPercent: 0, duration: 60, ease: "none", repeat: -1 }
    );
    const pause = () => loop.pause();
    const play = () => loop.play();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", play);

    // On hover, the title letters rise in with a stagger (the card's marquee still pauses via CSS).
    let active: HTMLElement | null = null;
    const onOver = (e: Event) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".amen-card");
      if (!card || card === active || reduce) return;
      active = card;
      gsap.fromTo(
        card.querySelectorAll(".amen-char"),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.025, ease: "power2.out", overwrite: true }
      );
    };
    const onLeave = (e: Event) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".amen-card");
      if (card && card === active) active = null;
    };
    el.addEventListener("mouseover", onOver);
    el.addEventListener("mouseout", onLeave);

    return () => {
      el.removeEventListener("mouseover", onOver);
      el.removeEventListener("mouseout", onLeave);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", play);
      loop.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div className="amen-marquee" ref={root}>
      <div className="amen-track">
        {AMENITIES.map((a) => <Card key={a.title} title={a.title} text={a.text} />)}
        {AMENITIES.map((a) => <Card key={a.title + "-dup"} title={a.title} text={a.text} hidden />)}
      </div>
    </div>
  );
}

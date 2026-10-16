"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  type?: "up" | "fade" | "clip" | "card";
  delay?: number;
  className?: string;
};

/** Scroll-triggered reveal per the Malory motion spec (§5). */
export default function Reveal({ children, type = "up", delay = 0, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: el, start: "top 88%", once: true };
      const ctx = gsap.context(() => {
        if (type === "up") gsap.from(el, { opacity: 0, y: 28, duration: 0.8, ease: "power3.out", delay, scrollTrigger: st });
        if (type === "fade") gsap.from(el, { opacity: 0, duration: 0.8, ease: "power2.out", delay, scrollTrigger: st });
        if (type === "card") gsap.from(el, { opacity: 0, y: 24, duration: 0.7, ease: "power3.out", delay, scrollTrigger: st });
        if (type === "clip")
          gsap.fromTo(el, { clipPath: "inset(12% 6% 12% 6%)", opacity: 0 },
            { clipPath: "inset(0 0 0 0)", opacity: 1, duration: 1, ease: "power3.out", delay, scrollTrigger: st });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [type, delay]);

  return <div ref={root} className={className}>{children}</div>;
}

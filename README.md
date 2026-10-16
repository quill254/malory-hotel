# Malory — hotel website (Next.js prototype)

Prototype for the Malory hotel website, Westlands, Nairobi.
**All content is [PLACEHOLDER]** pending hotel verification. `robots: noindex` is set in `app/layout.tsx` — remove only at launch.

## Stack
Next.js 14 (App Router) · TypeScript · GSAP + ScrollTrigger · Vercel-ready

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Structure
    app/                 routes (/, /stay, /book, /confirmation, /manage, + content pages)
    components/layout/   Header (scroll contrast + mobile menu), Footer
    components/motion/   Reveal — GSAP ScrollTrigger wrapper (spec §5, reduced-motion safe)
    lib/booking.ts       demo booking engine (client-side; replace with server-side PMS/engine before launch)

## Before launch (from the build specification)
1. Replace all [PLACEHOLDER] tokens with verified hotel content (see Malory_Placeholder_Content_Deck.md)
2. Swap lib/booking.ts for a server-side engine/PMS with atomic inventory + webhook payments (§8–9)
3. Set metadataBase to the final domain; remove noindex; submit sitemap in Search Console
4. Verify pool/spa/dining facilities before publishing those pages
5. Connect Vercel project; keep preview deployments noindexed

## Production integration layer (added)
    .env.example          all credentials, masked *** — copy to .env.local and replace
    lib/env.ts            typed server-only env access + placeholder guard
    lib/engine.ts         booking engine client (Cloudbeds/Pesapal) — server-side only
    lib/payments.ts       M-Pesa STK + card gateway + webhook verification stubs
    app/api/availability  GET  server-side availability
    app/api/bookings      POST create reservation (server-validated)
    app/api/webhooks/payment  provider events (M-Pesa callback / card webhook)
    app/sitemap.ts, app/robots.ts  SEO files (trim unverified pages at launch)
    components/seo/HotelJsonLd.tsx  structured data (fill [HOTEL.*] first)

Integration order: engine sandbox → payment sandbox → webhook verification →
notifications → swap lib/booking.ts demo for engine client → content swap → launch.
"# malory-hotel" 

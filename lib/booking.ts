// Demo booking engine (client-side prototype).
// PRODUCTION: replace with a server-side engine/PMS integration — this module
// documents the domain model and behaviour expected from the real system
// (research report §7–9: atomic inventory holds, webhook-verified payments).

export type RoomType = {
  id: string;
  name: string;      // placeholder until real inventory confirmed
  bed: string;
  occ: number;
  size: number;      // m²
  units: number;     // sample inventory
  rate: number;      // SAMPLE rate — replace with live engine rates
  img: string;       // placeholder swatch
  desc: string;      // sample description from rate sheet
  photo?: string;   // temporary reference photo URL — replace with hotel photography
};

export const CATALOG: RoomType[] = [
  { id: "standard", name: "Malory Standard Room", bed: "Queen bed", occ: 2, size: 24, units: 10, rate: 7000, img: "#D9DED3",
    desc: "A comfortable room with an en-suite bathroom, work desk, Wi-Fi and tea-and-coffee facilities." },
  { id: "deluxe", name: "Malory Deluxe Room", bed: "King bed", occ: 2, size: 32, units: 8, rate: 10500, img: "#E7DFCE",
    desc: "A larger room with a sitting area, premium bedding and city views." },
  { id: "twin", name: "Malory Twin Room", bed: "Two single beds", occ: 2, size: 28, units: 6, rate: 9000, img: "#DCE2D6",
    desc: "Ideal for colleagues or friends sharing a room, with an en-suite bathroom and dedicated workspace." },
  { id: "family", name: "Malory Family Suite", bed: "Two queen beds", occ: 4, size: 45, units: 4, rate: 15000, img: "#EFE6D4",
    desc: "A spacious suite with a lounge area and additional room for families." },
  { id: "executive", name: "Malory Executive Suite", bed: "King bed", occ: 2, size: 58, units: 2, rate: 20000, img: "#F3ECE0",
    desc: "An upscale suite with a separate lounge, enhanced amenities and a spacious bathroom." },
];

export const TAX = 0.16; // [TO CONFIRM — tax rules and breakdown pending hotel]

export const KES = (n: number) => "KSh " + n.toLocaleString("en-KE");

export type Booking = {
  ref: string;
  roomId: string;
  room: string;
  qty: number;
  ci: string;
  co: string;
  rate: number;
  total: number;
  guest: { name: string; email: string; phone: string };
  method: string;
  status: "confirmed" | "cancelled";
  created: string;
};

const KEY = "malory_bookings";

export const loadBookings = (): Booking[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const save = (b: Booking[]) => window.localStorage.setItem(KEY, JSON.stringify(b));

const overlap = (aS: string, aE: string, bS: string, bE: string) => aS < bE && bS < aE;
export const nights = (a: string, b: string) => Math.round((+new Date(b) - +new Date(a)) / 864e5);

function bookedUnits(id: string, ci: string, co: string) {
  return loadBookings()
    .filter((b) => b.roomId === id && b.status !== "cancelled" && overlap(ci, co, b.ci, b.co))
    .reduce((s, b) => s + b.qty, 0);
}

export type Quote = RoomType & { avail: number; n: number; sub: number; tax: number; total: number };

export function availability(ci: string, co: string): Quote[] {
  const n = nights(ci, co);
  return CATALOG.map((r) => {
    const sub = r.rate * n;
    const tax = Math.round(sub * TAX);
    return { ...r, avail: r.units - bookedUnits(r.id, ci, co), n, sub, tax, total: sub + tax };
  });
}

export function createBooking(d: Omit<Booking, "ref" | "status" | "created">): Booking {
  const b: Booking = {
    ...d,
    ref: "MLY-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    status: "confirmed",
    created: new Date().toISOString(),
  };
  save([...loadBookings(), b]);
  return b;
}

export const findBooking = (ref: string) =>
  loadBookings().find((b) => b.ref.toUpperCase() === ref.toUpperCase());

export function cancelBooking(ref: string) {
  const all = loadBookings();
  const b = all.find((x) => x.ref === ref);
  if (b) { b.status = "cancelled"; save(all); }
  return b;
}

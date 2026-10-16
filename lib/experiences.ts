// Detailed amenity/experience copy — DRAFTS pending hotel verification.
// Each item is written as final copy will read; the hotel confirms or it is removed.
export type Experience = { title: string; body: string[]; eyebrow: string; img: string; alt: string };

export const EXPERIENCES: Experience[] = [
  {
    eyebrow: "Eat & drink", title: "The Restaurant",
    img: "",
    alt: "Restaurant interior — temporary reference photo",
    body: [
      "An all-day dining room serving breakfast, lunch and dinner, with a menu built on East African ingredients and continental technique. The breakfast spread runs from [06:30], lunch from [12:00] and dinner until [22:30] — all hours to be confirmed.",
      "Dietary needs are catered for with advance notice — vegetarian, vegan and halal options [confirm]. Room service is available during restaurant hours [confirm].",
    ],
  },
  {
    eyebrow: "Match nights", title: "The Sports Bar",
    img: "",
    alt: "Lounge bar — temporary reference photo",
    body: [
      "The social heart of the hotel on big-match days. Large screens carry the Premier League, Champions League and local Kenyan fixtures, with a grill and bar menu served through the evening.",
      "Match-night specials, a pool table [confirm] and a resident DJ on weekends [confirm]. The bar is open to in-house guests and external visitors [confirm policy]. Opening hours and the monthly fixtures calendar to be confirmed.",
    ],
  },
  {
    eyebrow: "Unwind", title: "Swimming Pool",
    img: "",
    alt: "Pool terrace — temporary reference photo",
    body: [
      "[Facility to be confirmed] A pool terrace with loungers, shaded seating and towel service for guests. Morning lanes for early risers, relaxed afternoons for families.",
      "Hours, children's supervision rules and any guest-versus-resident access policy to be confirmed before this section is published.",
    ],
  },
  {
    eyebrow: "Keep moving", title: "Fitness Centre",
    img: "",
    alt: "Fitness centre — temporary reference photo",
    body: [
      "[Facility to be confirmed] Cardio machines, free weights and a stretching area, with [24-hour] room-key access for in-house guests.",
      "Equipment list, attendant hours and any booking rules to be confirmed.",
    ],
  },
  {
    eyebrow: "Practical matters", title: "Car Wash & Guest Services",
    img: "",
    alt: "Suite living area — temporary reference photo",
    body: [
      "On-site car wash and interior valet, arranged through the concierge with same-day turnaround — handy before a long drive or an airport run. Pricing and service menu to be confirmed.",
      "Also at the desk: laundry and dry cleaning with evening return, luggage storage for early arrivals and late departures [confirm], and printing at the business corner.",
    ],
  },
  {
    eyebrow: "Entertainment", title: "Football & Evenings at Malory",
    img: "",
    alt: "Premium suite — temporary reference photo",
    body: [
      "Beyond match screenings, the evening programme includes live-music nights, themed barbecue evenings and quiz nights [all to be confirmed].",
      "A monthly entertainment calendar will be published here and at the front desk once the programme is set. Private screening bookings for groups are available on request [confirm].",
    ],
  },
];

export const AMENITIES: { title: string; text: string }[] = [
  { title: "Restaurant & bar", text: "All-day dining with an East African and continental menu, plus a lounge bar for evening drinks. Hours and menu to be confirmed." },
  { title: "Sports bar", text: "A dedicated match-night bar with large-screen viewing, a grill and bar menu, and a lively but family-welcoming atmosphere." },
  { title: "Swimming pool", text: "Outdoor pool terrace with loungers and towel service. Hours, guest rules and lifeguard cover to be confirmed." },
  { title: "Fitness centre", text: "Cardio and free-weight equipment with 24-hour room-key access for in-house guests. Equipment list to be confirmed." },
  { title: "Car wash", text: "On-site vehicle cleaning for guests — exterior wash and interior valet, arranged through the concierge, same-day turnaround. Pricing to be confirmed." },
  { title: "Football & entertainment", text: "Match screenings, live-music evenings and themed nights. A monthly calendar will be published once confirmed." },
  { title: "Airport transfers", text: "Scheduled transfers to and from JKIA (~[N] min), bookable through reservations with 24 hours notice. Pricing to be confirmed." },
  { title: "Laundry & dry cleaning", text: "Same-day laundry and dry-cleaning service with evening return. Per-item pricing to be confirmed at the front desk." },
  { title: "Business corner", text: "Workstations with printing and high-speed internet for guests on the road. Location within the hotel to be confirmed." },
  { title: "High-speed Wi-Fi", text: "Complimentary property-wide internet in all rooms and public areas. Speed tier to be confirmed." },
  { title: "On-site parking", text: "Secure guest parking with 24-hour CCTV. Capacity and valet option to be confirmed." },
  { title: "Concierge & 24h reception", text: "Front desk and concierge available around the clock for bookings, transport, and local recommendations." },
];

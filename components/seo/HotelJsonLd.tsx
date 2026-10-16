// Hotel structured data — Google requires accurate, verified info.
// Replace remaining [to confirm] tokens (phone, street) before enabling indexing.
export default function HotelJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Malory Hotel",
    description: "Your comfort. Our signature.",
    url: "[SITE_URL]",
    telephone: "[Phone — to confirm]",
    address: {
      "@type": "PostalAddress",
      streetAddress: "[Street address — to confirm]",
      addressLocality: "Westlands, Nairobi",
      addressCountry: "KE",
    },
    checkinTime: "14:00",
    checkoutTime: "10:00",
    // add ONLY when verified: starRating, amenityFeature, priceRange, geo, image
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

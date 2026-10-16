import SimplePage, { simpleMetadata } from "@/components/SimplePage";

const intro = "Malory Hotel was envisioned as a welcoming destination in Westlands, Nairobi, where modern comfort meets attentive hospitality.";

export const metadata = simpleMetadata({ title: "Our Story", intro });

const paragraphs = [
  "Malory Hotel was envisioned as a welcoming destination in Westlands, Nairobi, where modern comfort meets attentive hospitality. Located in one of the city's vibrant commercial and lifestyle districts, the hotel is designed to serve guests seeking convenience, relaxation and a comfortable place to stay.",
  "Our approach is built around the belief that a great hotel experience extends beyond the room. From comfortable accommodation and dining to wellness experiences, events and extended-stay options, Malory Hotel aims to bring essential services together under one roof.",
  "Whether welcoming corporate travellers, couples, families or guests staying for longer periods, our focus is on creating an environment that feels professional, relaxing and personal. Every detail, from the guest experience to the spaces we provide, is intended to make each stay easier and more enjoyable.",
  "At Malory Hotel, we aspire to be more than a place to sleep. We aim to be a trusted home base in Nairobi, where guests can work, unwind, connect and return with confidence.",
];

export default function Page() {
  return (
    <SimplePage eyebrow="Malory" h1="Our story" intro="Your comfort. Our signature.">
      <div style={{ maxWidth: 720 }}>
        {paragraphs.map((t) => (
          <p key={t.slice(0, 24)} style={{ marginTop: 18, color: "rgba(41,43,39,.78)", lineHeight: 1.7 }}>{t}</p>
        ))}
      </div>
    </SimplePage>
  );
}

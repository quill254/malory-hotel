import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  // TODO: set metadataBase to the production origin once the domain is decided
  title: { default: "Malory | Boutique Hotel in Westlands, Nairobi", template: "%s | Malory" },
  description:
    "Discover Malory in Westlands, Nairobi. Explore rooms, dining and experiences — book your stay directly.",
  robots: { index: false }, // remove after launch content is verified
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

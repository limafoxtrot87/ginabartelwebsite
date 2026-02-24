import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { SocialEmblems } from "@/components/shared/SocialEmblems";
import { serviceAreas } from "@/data/serviceAreas";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Gina Bartel | Tampa Bay Real Estate",
  description:
    "Luxury-focused Tampa Bay real estate guidance with local expertise in Tampa, Fish Hawk, Lithia, Riverview, and surrounding communities.",
  keywords: [
    "Gina Bartel",
    "Florida Executive Realty",
    "Tampa Bay real estate",
    "Fish Hawk homes",
    "Riverview realtor"
  ]
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Gina Bartel",
  areaServed: serviceAreas.map((area) => area.name),
  telephone: "708-781-8205",
  email: "Gina@FloridaExecutiveRealty.com",
  memberOf: "Florida Executive Realty",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5801 Village Center Dr",
    addressLocality: "Lithia",
    addressRegion: "FL",
    addressCountry: "US"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl justify-end px-6 py-3">
          <SocialEmblems />
        </div>
        <main className="mx-auto max-w-7xl px-6 py-4">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

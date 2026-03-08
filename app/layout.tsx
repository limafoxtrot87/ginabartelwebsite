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
  title: {
    template: "%s | Gina Bartel",
    default: "Gina Bartel | Tampa Bay Real Estate Agent",
  },
  description:
    "Gina Bartel helps families find the right home in Tampa Bay. Serving Fish Hawk, Riverview, Lithia, Brandon & 13 more communities. Call 708-781-8205.",
  keywords: [
    "Gina Bartel",
    "Florida Executive Realty",
    "Tampa Bay real estate agent",
    "Fish Hawk homes",
    "Riverview realtor",
    "Lithia homes for sale",
    "Tampa Bay realtor",
    "military families Tampa Bay",
    "VA loans Tampa Bay"
  ]
};

const agentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Gina Bartel",
  url: "https://ginabartelwebsite.vercel.app",
  areaServed: serviceAreas.map((area) => area.name),
  telephone: "708-781-8205",
  email: "Gina@FloridaExecutiveRealty.com",
  memberOf: "Florida Executive Realty",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5801 Village Center Dr",
    addressLocality: "Lithia",
    addressRegion: "FL",
    postalCode: "33547",
    addressCountry: "US"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1"
  },
  sameAs: [
    "https://www.zillow.com/profile/ginambartel",
    "https://www.linkedin.com/in/gina-bartel",
    "https://www.instagram.com/ginabartelrealestate"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Gina Bartel — Florida Executive Realty",
  url: "https://ginabartelwebsite.vercel.app",
  telephone: "708-781-8205",
  email: "Gina@FloridaExecutiveRealty.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5801 Village Center Dr",
    addressLocality: "Lithia",
    addressRegion: "FL",
    postalCode: "33547",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.8630,
    longitude: -82.2001
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "15:00"
    }
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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

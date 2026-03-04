import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { ServiceAreasOverview } from "@/components/home/ServiceAreasOverview";
import { SoldHomesCarousel } from "@/components/home/SoldHomesCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { currentListings } from "@/data/currentListings";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-8">
      <Hero />

      <FadeInSection>
        <div className="grid gap-4 rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft md:grid-cols-3 md:p-8">
          <article>
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Trusted Process</p>
            <p className="mt-2 font-serif text-3xl">Strategy First</p>
            <p className="mt-2 text-sm text-charcoal/75">Pricing, positioning, and negotiation built around your long-term goals.</p>
          </article>
          <article>
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Local Coverage</p>
            <p className="mt-2 font-serif text-3xl">17 Core Areas</p>
            <p className="mt-2 text-sm text-charcoal/75">From South Tampa to Plant City with area-specific market guidance.</p>
          </article>
          <article>
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Client Focus</p>
            <p className="mt-2 font-serif text-3xl">Family Fit</p>
            <p className="mt-2 text-sm text-charcoal/75">Neighborhood recommendations aligned to school, commute, and lifestyle priorities.</p>
          </article>
        </div>
      </FadeInSection>

      {/* Featured listing banner */}
      {currentListings.length > 0 && (
        <FadeInSection>
          <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-luxury">
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={currentListings[0].heroImage}
                  alt={currentListings[0].address}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-600">Now Available</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-charcoal">{currentListings[0].price}</p>
                  <p className="mt-1 text-sm font-medium text-charcoal/70">{currentListings[0].address}</p>
                  <p className="text-sm text-charcoal/50">{currentListings[0].city}, {currentListings[0].state}</p>
                </div>
                <div className="flex gap-4 text-sm text-charcoal/70">
                  <span><strong className="text-charcoal">{currentListings[0].beds}</strong> bd</span>
                  <span><strong className="text-charcoal">{currentListings[0].baths}</strong> ba</span>
                  <span><strong className="text-charcoal">{currentListings[0].sqft.toLocaleString()}</strong> sqft</span>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Upgraded villa on a water-view lot in Valencia Del Sol — impact glass, screened lanai, resort amenities, and a den. Move-in ready.
                </p>
                <div className="flex gap-3">
                  <Link
                    href={`/listings/${currentListings[0].slug}`}
                    className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90"
                  >
                    View Listing
                  </Link>
                  <Link
                    href="/listings"
                    className="rounded-full border border-charcoal/20 px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold"
                  >
                    All Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      <FadeInSection>
        <CtaBand />
      </FadeInSection>

      <FadeInSection>
        <SoldHomesCarousel />
      </FadeInSection>

      <FadeInSection>
        <section className="space-y-5">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Client Experience</p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-3xl">Trusted by Tampa Bay Families</h2>
            <Link href="/awards" className="text-sm text-gold hover:underline">
              View Awards & Full Reviews
            </Link>
          </div>
          <Testimonials />
        </section>
      </FadeInSection>

      <FadeInSection>
        <ServiceAreasOverview />
      </FadeInSection>
    </div>
  );
}

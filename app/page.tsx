import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { ServiceAreasOverview } from "@/components/home/ServiceAreasOverview";
import { SoldHomesCarousel } from "@/components/home/SoldHomesCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { FadeInSection } from "@/components/shared/FadeInSection";
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

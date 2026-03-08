import type { Metadata } from "next";
import { Suspense } from "react";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { RotatingImage } from "@/components/shared/RotatingImage";
import { ContactForm } from "@/components/contact/ContactForm";
import { interiorPhotos } from "@/data/interiorPhotos";

export const metadata: Metadata = {
  title: "Contact Gina Bartel | Tampa Bay Real Estate Agent",
  description:
    "Connect with Gina Bartel, Tampa Bay real estate agent. Call 708-781-8205 or email Gina@FloridaExecutiveRealty.com. Serving 17 communities — quick response guaranteed.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.1fr]">
      <FadeInSection>
        <Suspense fallback={<div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-soft" />}>
          <ContactForm />
        </Suspense>
      </FadeInSection>

      <FadeInSection>
        <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
          <div className="relative h-[780px] w-full">
            <RotatingImage images={interiorPhotos} startIndex={1} className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 via-charcoal/30 to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-[0.14em] text-gold">Inside Tampa Bay Homes</p>
              <p className="mt-2 font-serif text-2xl">Design, Comfort, and Lifestyle</p>
              <p className="mt-2 text-sm text-white/80">From bright kitchens to waterfront lanais, Gina helps families find spaces that truly feel like home.</p>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

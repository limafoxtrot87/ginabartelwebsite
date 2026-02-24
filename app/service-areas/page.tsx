import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { serviceAreas } from "@/data/serviceAreas";

function SchoolDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Schools rated ${rating} out of 10`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`inline-block h-1.5 w-1.5 rounded-full ${i < rating ? "bg-gold" : "bg-charcoal/15"}`}
        />
      ))}
    </div>
  );
}

export default function ServiceAreasPage() {
  return (
    <div className="space-y-8 pb-10">
      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Service Areas</p>
          <h1 className="mt-2 font-serif text-4xl">Tampa Bay Area Readouts</h1>
          <p className="mt-3 max-w-3xl text-charcoal/75">
            Explore local area profiles with lifestyle fit, market positioning, and practical pros/cons for each neighborhood.
          </p>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-luxury"
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={area.image} alt={`${area.name} Tampa Bay`} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <p className="font-serif text-2xl">{area.name}</p>
                {(area.medianPrice || area.schoolsRating) && (
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {area.medianPrice && (
                      <span className="rounded-full bg-charcoal/5 px-2.5 py-0.5 text-xs font-medium text-charcoal/70">
                        Median {area.medianPrice}
                      </span>
                    )}
                    {area.schoolsRating && (
                      <div className="flex items-center gap-1.5">
                        <SchoolDots rating={area.schoolsRating} />
                        <span className="text-xs text-charcoal/50">Schools</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="mt-2 text-sm text-charcoal/75">{area.overview}</p>
                <p className="mt-4 text-sm text-gold">View Area Intelligence</p>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { currentListings } from "@/data/currentListings";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "Coming Soon": "bg-blue-50 text-blue-700 border-blue-200",
};

export default function ListingsPage() {
  return (
    <div className="space-y-10 pb-10">
      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Active Listings</p>
          <h1 className="mt-2 font-serif text-4xl">Currently Available</h1>
          <p className="mt-3 max-w-xl text-charcoal/75">
            Homes personally listed by Gina Bartel — professionally marketed, competitively priced, and ready for your next chapter.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="grid gap-8 lg:grid-cols-2">
          {currentListings.map((listing) => (
            <Link
              key={listing.slug}
              href={`/listings/${listing.slug}`}
              className="group overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-soft transition hover:shadow-luxury"
            >
              {/* Hero image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={listing.heroImage}
                  alt={listing.address}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {/* Status badge */}
                <span
                  className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-medium ${statusColors[listing.status]}`}
                >
                  {listing.status}
                </span>
                {/* Photo count */}
                <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.photos.length} photos
                </span>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl text-charcoal">{listing.price}</p>
                    <p className="mt-0.5 text-sm font-medium text-charcoal/70">{listing.address}</p>
                    <p className="text-sm text-charcoal/50">{listing.city}, {listing.state} {listing.zip}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-charcoal/5 px-3 py-1 text-xs text-charcoal/60">
                    {listing.type}
                  </span>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex gap-5 border-t border-charcoal/8 pt-4 text-sm text-charcoal/70">
                  <span><strong className="text-charcoal">{listing.beds}</strong> bd</span>
                  <span><strong className="text-charcoal">{listing.baths}</strong> ba</span>
                  <span><strong className="text-charcoal">{listing.sqft.toLocaleString()}</strong> sqft</span>
                  <span><strong className="text-charcoal">${listing.pricePerSqft}</strong>/sqft</span>
                </div>

                {listing.community && (
                  <p className="mt-3 text-xs text-charcoal/50">{listing.community}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {listing.highlights.slice(0, 4).map((h) => (
                    <span key={h} className="rounded-full border border-charcoal/10 px-2.5 py-0.5 text-xs text-charcoal/65">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs text-charcoal/40">MLS# {listing.mlsNumber}</p>
                  <span className="text-sm text-gold group-hover:underline">View Listing →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>

      {/* Bottom CTA */}
      <FadeInSection>
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 text-center shadow-soft">
          <p className="font-serif text-2xl">Looking for something specific?</p>
          <p className="mt-2 text-charcoal/70">
            Gina has access to off-market opportunities and can help you find the right home before it hits the MLS.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-full bg-charcoal px-7 py-3 text-sm text-white transition hover:bg-charcoal/90"
          >
            Talk to Gina
          </Link>
        </div>
      </FadeInSection>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { currentListings } from "@/data/currentListings";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return currentListings.map((l) => ({ slug: l.slug }));
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "Coming Soon": "bg-blue-50 text-blue-700 border-blue-200",
};

export default function ListingDetailPage({ params }: Props) {
  const listing = currentListings.find((l) => l.slug === params.slug);
  if (!listing) notFound();

  const fullAddress = `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`;

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal/50">
        <Link href="/listings" className="hover:text-gold transition-colors">
          Listings
        </Link>
        <span>›</span>
        <span className="text-charcoal/80">{listing.address}</span>
      </div>

      {/* Main grid — gallery + sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Left: Gallery */}
        <div className="space-y-6">
          <ListingGallery photos={listing.photos} address={listing.address} />

          {/* Description */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl text-charcoal">About This Home</h2>
            <div className="mt-4 space-y-4">
              {listing.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-charcoal/80">{para}</p>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl text-charcoal">Features & Amenities</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-gold">Interior</p>
                <ul className="space-y-1.5">
                  {listing.features.interior.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal/75">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-gold">Outdoor</p>
                <ul className="space-y-1.5">
                  {listing.features.outdoor.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal/75">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-gold">Community</p>
                <ul className="space-y-1.5">
                  {listing.features.community.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-charcoal/75">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Property details table */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl text-charcoal">Property Details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 text-sm">
              {[
                { label: "Type", value: listing.type },
                { label: "Year Built", value: listing.yearBuilt },
                { label: "Living Area", value: `${listing.sqft.toLocaleString()} sqft` },
                { label: "Lot Size", value: listing.lotSqft ? `${listing.lotSqft.toLocaleString()} sqft` : undefined },
                { label: "Price/sqft", value: `$${listing.pricePerSqft}` },
                { label: "HOA", value: listing.hoaMonthly ? `$${listing.hoaMonthly}/mo` : undefined },
                { label: "Community", value: listing.community },
                { label: "MLS#", value: listing.mlsNumber },
                { label: "Listed", value: listing.listedDate },
                { label: "Days on Market", value: listing.daysOnMarket },
                { label: "Listing Terms", value: listing.loanTypes.join(", ") },
                { label: "Listing Agent", value: "Gina Bartel" },
              ]
                .filter((r) => r.value !== undefined && r.value !== "")
                .map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs text-charcoal/45 uppercase tracking-[0.1em]">{row.label}</dt>
                    <dd className="mt-0.5 font-medium text-charcoal">{String(row.value)}</dd>
                  </div>
                ))}
            </dl>
          </div>

          {/* Legal */}
          <p className="text-xs leading-relaxed text-charcoal/40">
            IDX information is provided exclusively for personal, non-commercial use and may not be used for any purpose other than to identify prospective properties. Source: Stellar MLS / Suncoast Tampa. © 2026 Gina Bartel, Florida Executive Realty.
          </p>
        </div>

        {/* Right: Sticky sidebar */}
        <div className="space-y-4 lg:sticky lg:top-24">
          {/* Price card */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-luxury">
            <div className="flex items-center justify-between">
              <p className="font-serif text-3xl text-charcoal">{listing.price}</p>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[listing.status]}`}>
                {listing.status}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-charcoal">{listing.address}</p>
            <p className="text-sm text-charcoal/55">{listing.city}, {listing.state} {listing.zip}</p>

            {/* Quick stats */}
            <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-charcoal/4 p-3">
              <div className="text-center">
                <p className="font-serif text-xl text-charcoal">{listing.beds}</p>
                <p className="text-xs text-charcoal/55">Beds</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl text-charcoal">{listing.baths}</p>
                <p className="text-xs text-charcoal/55">Baths</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-xl text-charcoal">{listing.sqft.toLocaleString()}</p>
                <p className="text-xs text-charcoal/55">Sqft</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {listing.highlights.map((h) => (
                <span key={h} className="rounded-full border border-charcoal/10 px-2.5 py-0.5 text-xs text-charcoal/65">
                  {h}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-5 space-y-2.5">
              <Link
                href={`/contact?listing=${listing.slug}&subject=Schedule a Tour — ${listing.address}`}
                className="flex w-full items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm text-white transition hover:bg-charcoal/90"
              >
                Schedule a Tour
              </Link>
              <Link
                href={`/contact?listing=${listing.slug}&subject=Question about ${listing.address}`}
                className="flex w-full items-center justify-center rounded-full border border-charcoal/25 px-5 py-3 text-sm transition hover:border-gold hover:text-gold"
              >
                Ask Gina a Question
              </Link>
              <a
                href={`tel:7087818205`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-charcoal/15 px-5 py-2.5 text-sm text-charcoal/70 transition hover:border-gold hover:text-gold"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                708-781-8205
              </a>
            </div>
          </div>

          {/* Agent card */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Listed by</p>
            <p className="mt-1 font-serif text-lg text-charcoal">Gina Bartel</p>
            <p className="text-sm text-charcoal/60">Florida Executive Realty</p>
            <p className="mt-1 text-xs text-charcoal/45">813-327-7807 · MLS# {listing.mlsNumber}</p>
          </div>

          {/* Estimated payment */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-medium text-charcoal">Estimated Monthly</p>
            <p className="mt-1 font-serif text-2xl text-charcoal">~$3,128<span className="text-base font-sans text-charcoal/50">/mo</span></p>
            <div className="mt-3 space-y-1 text-xs text-charcoal/55">
              <div className="flex justify-between"><span>Principal & Interest</span><span>$1,751</span></div>
              <div className="flex justify-between"><span>HOA Fees</span><span>${listing.hoaMonthly}/mo</span></div>
              <div className="flex justify-between"><span>Other costs (est.)</span><span>$688</span></div>
            </div>
            <p className="mt-2 text-xs text-charcoal/35">Estimates only. Contact Gina for lender referrals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

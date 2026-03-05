import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { soldHomes } from "@/data/soldHomes";

export default function SoldHomesPage() {
  return (
    <div className="space-y-8 pb-10">
      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Track Record</p>
          <h1 className="mt-2 font-serif text-4xl">Recently Closed Transactions</h1>
          <p className="mt-3 max-w-xl text-charcoal/75">
            A selection of Gina&apos;s represented sales across Tampa Bay and surrounding areas.
          </p>
        </div>
      </FadeInSection>

      {/* Zillow CTA banner */}
      <FadeInSection>
        <div className="flex flex-col gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-charcoal">Want to see the complete listing history?</p>
            <p className="mt-1 text-sm text-charcoal/70">
              Full details, photos, and every transaction are available on Gina&apos;s Zillow profile.
            </p>
          </div>
          <a
            href="https://www.zillow.com/profile/ginambartel"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-charcoal px-6 py-2.5 text-sm text-white transition hover:bg-charcoal/90"
          >
            View on Zillow →
          </a>
        </div>
      </FadeInSection>

      {/* Grid */}
      <FadeInSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {soldHomes.map((home) => (
            <Link
              key={home.slug}
              href={`/sold-homes/${home.slug}`}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft transition hover:shadow-luxury"
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={home.image!}
                  alt={home.address}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shadow-sm">
                  Sold
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="font-serif text-xl text-charcoal">{home.soldPrice}</p>
                <p className="mt-0.5 text-sm font-medium text-charcoal/80">{home.address}</p>
                <p className="text-xs text-charcoal/50">{home.city}, {home.state} {home.zip}</p>

                <div className="mt-3 flex gap-4 border-t border-charcoal/8 pt-3 text-sm text-charcoal/65">
                  <span><strong className="text-charcoal">{home.beds}</strong> bd</span>
                  <span><strong className="text-charcoal">{home.baths}</strong> ba</span>
                  <span><strong className="text-charcoal">{home.sqft.toLocaleString()}</strong> sqft</span>
                </div>

                <div className="mt-1.5 flex flex-wrap gap-x-3 text-xs text-charcoal/40">
                  {home.yearBuilt && <span>Built {home.yearBuilt}</span>}
                  {home.lotSize && <span>Lot: {home.lotSize}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>

      {/* Bottom Zillow CTA */}
      <FadeInSection>
        <div className="rounded-3xl border border-charcoal/10 bg-white p-8 text-center shadow-soft">
          <p className="font-serif text-2xl">See the complete picture</p>
          <p className="mt-2 text-charcoal/70">
            To see a complete list of Gina&apos;s listings and full details on each transaction,
            please visit her Zillow profile.
          </p>
          <a
            href="https://www.zillow.com/profile/ginambartel"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-full bg-charcoal px-7 py-3 text-sm text-white transition hover:bg-charcoal/90"
          >
            Visit Gina&apos;s Zillow Profile →
          </a>
        </div>
      </FadeInSection>
    </div>
  );
}

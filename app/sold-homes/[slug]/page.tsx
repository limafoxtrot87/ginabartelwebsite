import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { soldHomes } from "@/data/soldHomes";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return soldHomes.map((home) => ({ slug: home.slug }));
}

export default function SoldHomeDetailPage({ params }: Props) {
  const home = soldHomes.find((entry) => entry.slug === params.slug);
  if (!home) notFound();

  return (
    <div className="space-y-6 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-charcoal/50">
        <Link href="/sold-homes" className="hover:text-gold transition-colors">Recently Closed</Link>
        <span>›</span>
        <span className="text-charcoal/80">{home.address}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_340px] md:items-start">
        {/* Main */}
        <div className="space-y-5">
          {/* Photo */}
          {home.image && (
            <div className="relative h-[400px] overflow-hidden rounded-2xl border border-charcoal/10 shadow-soft">
              <Image
                src={home.image}
                alt={home.address}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute left-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
                Sold
              </span>
            </div>
          )}

          {/* Details card */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-3xl text-charcoal">{home.soldPrice}</p>
                <p className="mt-1 text-base font-medium text-charcoal/80">{home.address}</p>
                <p className="text-sm text-charcoal/55">{home.city}, {home.state} {home.zip}</p>
              </div>
              <span className="rounded-full bg-charcoal/6 px-3 py-1 text-sm text-charcoal/55">{home.type}</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Beds", value: home.beds },
                { label: "Baths", value: home.baths },
                { label: "Sqft", value: home.sqft.toLocaleString() },
                { label: "Built", value: home.yearBuilt ?? "—" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-charcoal/4 p-4 text-center">
                  <p className="font-serif text-2xl text-charcoal">{s.value}</p>
                  <p className="text-xs text-charcoal/50">{s.label}</p>
                </div>
              ))}
            </div>

            {home.lotSize && (
              <p className="mt-4 text-sm text-charcoal/55">Lot size: {home.lotSize}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-charcoal/75">{home.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-luxury">
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Represented by</p>
            <p className="mt-1 font-serif text-lg text-charcoal">Gina Bartel</p>
            <p className="text-sm text-charcoal/60">Florida Executive Realty</p>
            <div className="mt-5 space-y-2.5">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm text-white transition hover:bg-charcoal/90"
              >
                Work with Gina
              </Link>
              <a
                href="https://www.zillow.com/profile/ginambartel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full border border-charcoal/20 px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold"
              >
                Full History on Zillow ↗
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-soft text-center">
            <p className="text-sm text-charcoal/70">
              To see a complete list of Gina&apos;s listings and full details on every transaction, visit her Zillow profile.
            </p>
            <a
              href="https://www.zillow.com/profile/ginambartel"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-gold hover:underline"
            >
              Visit Zillow Profile →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

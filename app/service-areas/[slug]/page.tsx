import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceAreas } from "@/data/serviceAreas";
import { serviceAreaDetails } from "@/data/serviceAreaDetails";

type ServiceAreaDetailProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: ServiceAreaDetailProps): Metadata {
  const area = serviceAreas.find((entry) => entry.slug === params.slug);
  if (!area) return {};
  return {
    title: `${area.name} Real Estate & Homes for Sale`,
    description: `${area.overview} Gina Bartel serves ${area.name} and 16 other Tampa Bay communities. Call 708-781-8205.`,
  };
}

export default function ServiceAreaDetailPage({ params }: ServiceAreaDetailProps) {
  const area = serviceAreas.find((entry) => entry.slug === params.slug);

  if (!area) {
    notFound();
  }

  const detail = serviceAreaDetails[area.slug];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ginabartelrealestate.com" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://ginabartelrealestate.com/service-areas" },
      { "@type": "ListItem", position: 3, name: area.name, item: `https://ginabartelrealestate.com/service-areas/${area.slug}` },
    ],
  };

  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-soft">
        <div className="relative h-64 md:h-80">
          <Image src={area.image} alt={`${area.name} overview`} fill className="object-cover" priority />
        </div>
        <div className="p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Service Area Profile</p>
          <h1 className="mt-2 font-serif text-4xl">{area.name}</h1>
          <p className="mt-4 max-w-3xl text-charcoal/80">{area.overview}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Lifestyle Fit</h2>
          <p className="mt-3 text-charcoal/80">{area.lifestyle}</p>
        </article>

        <article className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Amenities</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-charcoal/80">
            {area.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Commute & Access</h2>
          <p className="mt-3 text-charcoal/80">{area.commute}</p>
        </article>

        <article className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl">Market Readout</h2>
          <p className="mt-3 text-charcoal/80">{area.market}</p>
        </article>
      </div>

      {detail ? (
        <section className="space-y-6 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-serif text-3xl">Deep Area Intelligence</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Schools & Education</p>
              <p className="mt-2 text-charcoal/80">{detail.schools}</p>
            </article>
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Housing Landscape</p>
              <p className="mt-2 text-charcoal/80">{detail.housing}</p>
            </article>
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Commute Reality</p>
              <p className="mt-2 text-charcoal/80">{detail.commute}</p>
            </article>
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Lifestyle Pattern</p>
              <p className="mt-2 text-charcoal/80">{detail.lifestyle}</p>
            </article>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Best Fit Buyers</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-charcoal/80">
                {detail.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <p className="text-xs uppercase tracking-[0.12em] text-gold">Watch Items</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-charcoal/80">
                {detail.watchFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <article>
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Military Family Notes</p>
            <p className="mt-2 text-charcoal/80">{detail.militaryNotes}</p>
          </article>
          <article>
            <p className="text-xs uppercase tracking-[0.12em] text-gold">Weekend Spots</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-charcoal/80">
              {detail.weekendSpots.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-serif text-2xl text-emerald-900">Pros</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-emerald-900/90">
            {area.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-serif text-2xl text-amber-900">Cons</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-amber-900/90">
            {area.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <Link href="/contact" className="inline-flex rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90">
        Ask Gina About {area.name}
      </Link>
    </div>
  );
}

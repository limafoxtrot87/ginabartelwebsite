import Link from "next/link";
import { serviceAreas } from "@/data/serviceAreas";

export function ServiceAreasOverview() {
  const featuredAreas = serviceAreas.slice(0, 9);

  return (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl">Service Areas</h3>
          <p className="mt-2 text-sm text-charcoal/70">Click any area for a full local readout.</p>
        </div>
        <Link href="/service-areas" className="text-sm text-gold hover:underline">
          View All Area Profiles
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featuredAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/service-areas/${area.slug}`}
            className="rounded-xl border border-charcoal/10 px-4 py-3 text-sm transition hover:border-gold hover:bg-cream"
          >
            <p className="font-medium text-charcoal">{area.name}</p>
            <p className="mt-1 text-charcoal/70">{area.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

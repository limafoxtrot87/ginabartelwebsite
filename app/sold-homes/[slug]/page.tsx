import Image from "next/image";
import { notFound } from "next/navigation";
import { soldHomes } from "@/data/soldHomes";

type SoldHomeDetailProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return soldHomes.map((home) => ({ slug: home.slug }));
}

export default function SoldHomeDetailPage({ params }: SoldHomeDetailProps) {
  const home = soldHomes.find((entry) => entry.slug === params.slug);

  if (!home) {
    notFound();
  }

  return (
    <div className="grid gap-8 pb-10 md:grid-cols-[1.3fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
        <Image
          src={home.image}
          alt={home.address}
          width={1600}
          height={1000}
          className="h-[460px] w-full object-cover"
        />
      </div>
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.14em] text-gold">Property Detail</p>
        <h1 className="mt-2 font-serif text-3xl">{home.address}</h1>
        <p className="mt-1 text-charcoal/75">{home.city}</p>
        <div className="mt-5 space-y-2 text-sm text-charcoal/80">
          {home.price ? <p><span className="font-medium text-charcoal">Sold Price:</span> {home.price}</p> : null}
          {home.saleDate ? <p><span className="font-medium text-charcoal">Sale Date:</span> {home.saleDate}</p> : null}
          {home.daysOnMarket ? <p><span className="font-medium text-charcoal">Days on Market:</span> {home.daysOnMarket}</p> : null}
          {home.beds ? <p><span className="font-medium text-charcoal">Beds:</span> {home.beds}</p> : null}
          {home.baths ? <p><span className="font-medium text-charcoal">Baths:</span> {home.baths}</p> : null}
          <p><span className="font-medium text-charcoal">Description:</span> {home.description}</p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { soldHomes } from "@/data/soldHomes";

export default function SoldHomesPage() {
  return (
    <div className="space-y-8 pb-10">
      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Sold Homes</p>
          <h1 className="mt-2 font-serif text-4xl">Gallery of Closed Transactions</h1>
          <p className="mt-3 text-charcoal/75">Recent sold homes across Gina&apos;s service areas.</p>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {soldHomes.map((home) => (
            <Link
              key={home.slug}
              href={`/sold-homes/${home.slug}`}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft"
            >
              <div className="overflow-hidden">
                <Image
                  src={home.image}
                  alt={home.address}
                  width={1200}
                  height={760}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-1 p-4">
                <p className="font-serif text-xl">{home.address}</p>
                <p className="text-sm text-charcoal/70">{home.city}</p>
                {home.price && (
                  <p className="font-medium text-charcoal">{home.price}</p>
                )}
                {home.saleDate && (
                  <p className="text-xs text-charcoal/50">Sold {home.saleDate}</p>
                )}
                <p className="pt-1 text-sm text-charcoal/75">{home.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>
    </div>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Tampa Bay Neighborhoods Guide | Fish Hawk, Riverview & More",
  description:
    "Explore Tampa Bay neighborhoods with Gina's interactive guide. Market data, school ratings, and lifestyle fit for 17 Hillsborough County communities.",
};
import summariesData from "@/data/neighborhoodSummaries.json";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { neighborhoods } from "@/data/neighborhoods";

const NeighborhoodMap = dynamic(
  () => import("@/components/neighborhoods/NeighborhoodMap").then((mod) => mod.NeighborhoodMap),
  { ssr: false }
);

export default function NeighborhoodsPage() {
  return (
    <div className="space-y-8 pb-10">
      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Explore Tampa!</p>
          <h1 className="mt-2 font-serif text-4xl">Interactive Tampa Bay Neighborhood Guide</h1>
          <p className="mt-3 max-w-3xl text-charcoal/75">
            Click any marker to review lifestyle highlights, amenities, and bi-weekly cached market summaries.
          </p>
        </div>
      </FadeInSection>
      <FadeInSection>
        <NeighborhoodMap neighborhoods={neighborhoods} summaries={summariesData.summaries} />
      </FadeInSection>
    </div>
  );
}

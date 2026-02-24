"use client";

import dynamic from "next/dynamic";
import type { Neighborhood } from "@/lib/types";

type NeighborhoodMapProps = {
  neighborhoods: Neighborhood[];
  summaries: Record<string, string>;
};

const NeighborhoodMapInner = dynamic(
  () => import("@/components/neighborhoods/NeighborhoodMapInner").then((mod) => mod.NeighborhoodMapInner),
  {
    ssr: false,
    loading: () => <div className="h-[520px] animate-pulse rounded-2xl border border-charcoal/10 bg-white" />
  }
);

export function NeighborhoodMap({ neighborhoods, summaries }: NeighborhoodMapProps) {
  return <NeighborhoodMapInner neighborhoods={neighborhoods} summaries={summaries} />;
}

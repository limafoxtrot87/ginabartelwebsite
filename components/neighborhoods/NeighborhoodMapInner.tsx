"use client";

import "@/styles/leaflet.css";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import type { Neighborhood } from "@/lib/types";

type NeighborhoodMapInnerProps = {
  neighborhoods: Neighborhood[];
  summaries: Record<string, string>;
};

export function NeighborhoodMapInner({ neighborhoods, summaries }: NeighborhoodMapInnerProps) {
  const [activeSlug, setActiveSlug] = useState(neighborhoods[0]?.slug ?? "");

  const active = useMemo(
    () => neighborhoods.find((item) => item.slug === activeSlug) ?? neighborhoods[0],
    [activeSlug, neighborhoods]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="h-[520px] overflow-hidden rounded-2xl border border-charcoal/10 shadow-soft">
        <MapContainer center={[27.93, -82.34]} zoom={9} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {neighborhoods.map((location) => (
            <CircleMarker
              key={location.slug}
              center={[location.lat, location.lng]}
              radius={activeSlug === location.slug ? 10 : 8}
              pathOptions={{
                color: "#b89b5e",
                fillColor: activeSlug === location.slug ? "#b89b5e" : "#ffffff",
                fillOpacity: 0.9,
                weight: 2
              }}
              eventHandlers={{ click: () => setActiveSlug(location.slug) }}
            />
          ))}
        </MapContainer>
      </div>
      {active ? (
        <aside className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Neighborhood Intelligence</p>
          <h3 className="mt-2 font-serif text-2xl">{active.name}</h3>
          <div className="mt-4 space-y-4 text-sm text-charcoal/80">
            <div>
              <p className="font-medium text-charcoal">Overview</p>
              <p>{active.overview}</p>
            </div>
            <div>
              <p className="font-medium text-charcoal">Lifestyle</p>
              <p>{active.lifestyle}</p>
            </div>
            <div>
              <p className="font-medium text-charcoal">Nearby Amenities</p>
              <ul className="mt-1 list-disc pl-4">
                {active.amenities.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-charcoal">Market Conditions</p>
              <p>{active.market}</p>
            </div>
            <div>
              <p className="font-medium text-charcoal">Bottom Line Up Front</p>
              <p>{summaries[active.slug] ?? "Summary unavailable."}</p>
            </div>
          </div>
          <Link
            href={`/contact?neighborhood=${active.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90"
          >
            Ask About {active.name}
          </Link>
          <Link
            href={`/service-areas/${active.slug}`}
            className="mt-2 block text-center text-xs text-gold hover:underline"
          >
            Full Area Intelligence →
          </Link>
        </aside>
      ) : null}
    </div>
  );
}

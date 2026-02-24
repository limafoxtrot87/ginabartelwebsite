"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { soldHomes } from "@/data/soldHomes";

const PRICE_FILTERS = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $600k", min: 0, max: 600000 },
  { label: "$600k – $800k", min: 600000, max: 800000 },
  { label: "$800k+", min: 800000, max: Infinity },
];

function parsePrice(price: string | undefined): number {
  if (!price) return 0;
  return parseFloat(price.replace(/[$,]/g, "")) * 1000;
}

export function SoldHomesCarousel() {
  const [filterIndex, setFilterIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const activeFilter = PRICE_FILTERS[filterIndex];

  const filtered = useMemo(() => {
    const raw = soldHomes.filter((h) => {
      const p = parsePrice(h.price);
      return p >= activeFilter.min && p <= activeFilter.max;
    });
    return raw.length > 0 ? raw : soldHomes;
  }, [filterIndex, activeFilter]);

  const safeIndex = index >= filtered.length ? 0 : index;
  const current = filtered[safeIndex];

  function handleFilter(i: number) {
    setFilterIndex(i);
    setIndex(0);
  }

  return (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-5 shadow-soft md:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-serif text-2xl">Featured Sold Homes</h3>
        <div className="flex flex-wrap gap-2">
          {PRICE_FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => handleFilter(i)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                filterIndex === i
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-charcoal/20 hover:border-gold hover:text-gold"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-charcoal/50">
          {safeIndex + 1} of {filtered.length}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1))}
            className="rounded-full border border-charcoal/20 px-3 py-1 text-sm hover:border-gold"
            aria-label="Previous"
          >
            Prev
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % filtered.length)}
            className="rounded-full border border-charcoal/20 px-3 py-1 text-sm hover:border-gold"
            aria-label="Next"
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-5 md:grid-cols-[1.2fr_1fr]"
        >
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={current.image}
              alt={`${current.address} sold by Gina Bartel`}
              width={1400}
              height={900}
              className="h-[290px] w-full object-cover transition duration-500 hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-serif text-xl">{current.address}</p>
              <p className="text-sm text-charcoal/70">{current.city}</p>
              {current.price && (
                <p className="mt-2 text-lg font-medium text-charcoal">{current.price}</p>
              )}
              {(current.beds || current.baths) && (
                <p className="text-sm text-charcoal/60">
                  {current.beds ? `${current.beds} bd` : ""}
                  {current.beds && current.baths ? " · " : ""}
                  {current.baths ? `${current.baths} ba` : ""}
                </p>
              )}
              {current.saleDate && (
                <p className="mt-1 text-xs text-charcoal/50">
                  Sold {current.saleDate}
                  {current.daysOnMarket ? ` · ${current.daysOnMarket} days on market` : ""}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{current.description}</p>
            </div>
            <Link href={`/sold-homes/${current.slug}`} className="mt-6 inline-flex text-sm text-gold hover:underline">
              View Property Details
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

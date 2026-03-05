"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { soldHomes } from "@/data/soldHomes";

const PRICE_FILTERS = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $500k", min: 0, max: 500000 },
  { label: "$500k – $700k", min: 500000, max: 700000 },
  { label: "$700k+", min: 700000, max: Infinity },
];

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$,]/g, "")) * 1000;
}

export function SoldHomesCarousel() {
  const [filterIndex, setFilterIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const activeFilter = PRICE_FILTERS[filterIndex];

  const filtered = useMemo(() => {
    const raw = soldHomes.filter((h) => {
      const p = parsePrice(h.soldPrice);
      return p >= activeFilter.min && p <= activeFilter.max;
    });
    return raw.length > 0 ? raw : soldHomes;
  }, [activeFilter]);

  const safeIndex = index >= filtered.length ? 0 : index;
  const current = filtered[safeIndex];

  function handleFilter(i: number) {
    setFilterIndex(i);
    setIndex(0);
  }

  return (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-5 shadow-soft md:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-serif text-2xl">Recently Closed Transactions</h3>
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

      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-charcoal/50">{safeIndex + 1} of {filtered.length}</p>
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
          className="grid gap-5 md:grid-cols-[1.3fr_1fr]"
        >
          {/* Photo */}
          <div className="relative h-[260px] overflow-hidden rounded-2xl">
            <Image
              src={current.image!}
              alt={`${current.address} — closed by Gina Bartel`}
              fill
              className="object-cover transition duration-500 hover:scale-[1.02]"
            />
            <span className="absolute left-3 top-3 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 shadow-sm">
              Sold
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-serif text-2xl text-charcoal">{current.soldPrice}</p>
              <p className="mt-1 text-sm font-medium text-charcoal/80">{current.address}</p>
              <p className="text-xs text-charcoal/50">{current.city}, {current.state} {current.zip}</p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Beds", value: current.beds },
                  { label: "Baths", value: current.baths },
                  { label: "Sqft", value: current.sqft.toLocaleString() },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-charcoal/4 p-2.5 text-center">
                    <p className="font-serif text-lg text-charcoal">{s.value}</p>
                    <p className="text-xs text-charcoal/50">{s.label}</p>
                  </div>
                ))}
              </div>

              {(current.yearBuilt || current.lotSize) && (
                <div className="mt-2 flex gap-3 text-xs text-charcoal/45">
                  {current.yearBuilt && <span>Built {current.yearBuilt}</span>}
                  {current.lotSize && <span>Lot: {current.lotSize}</span>}
                </div>
              )}

              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{current.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-3">
              <Link href="/sold-homes" className="text-sm text-gold hover:underline">
                View All →
              </Link>
              <a
                href="https://www.zillow.com/profile/ginambartel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-charcoal/40 hover:text-gold transition-colors"
              >
                Full history on Zillow ↗
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

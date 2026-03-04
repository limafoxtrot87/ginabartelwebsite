"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  photos: string[];
  address: string;
};

export function ListingGallery({ photos, address }: Props) {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i + 1) % photos.length);
  }

  return (
    <div className="space-y-3">
      {/* Main photo */}
      <div className="relative overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5 shadow-luxury">
        <div className="relative h-[480px] w-full md:h-[560px]">
          <Image
            src={photos[active]}
            alt={`${address} — photo ${active + 1}`}
            fill
            className="object-cover transition duration-300"
            priority={active === 0}
          />
        </div>
        {/* Prev / next overlays */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur hover:bg-white transition"
          aria-label="Previous photo"
        >
          <svg className="h-5 w-5 text-charcoal" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur hover:bg-white transition"
          aria-label="Next photo"
        >
          <svg className="h-5 w-5 text-charcoal" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Counter */}
        <div className="absolute bottom-3 right-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
          {active + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
              active === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`View photo ${i + 1}`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

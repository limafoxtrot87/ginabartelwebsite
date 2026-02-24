"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { agentPhotos } from "@/data/agentPhotos";
import { RotatingImage } from "@/components/shared/RotatingImage";

export function Hero() {
  const items = {
    hidden: { opacity: 0, y: 22 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="bg-hero-glow">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-14 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <motion.p custom={0} initial="hidden" animate="show" variants={items} className="text-sm uppercase tracking-[0.2em] text-gold">
            <Link href="https://www.floridaexecutiverealty.com/" target="_blank" className="hover:underline">
              Florida Executive Realty
            </Link>
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="show" variants={items} className="font-serif text-4xl leading-tight md:text-5xl">
            Helping Families Find Home in Tampa Bay
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="show" variants={items} className="max-w-xl text-lg text-charcoal/75">
            Trust, experience, and local expertise guiding every step from first showing to closing day.
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="show" variants={items} className="flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90">
              Let&apos;s Talk About Your Move
            </Link>
            <Link href="/sold-homes" className="rounded-full border border-charcoal/25 bg-white px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold">
              See Where I&apos;ve Sold
            </Link>
            <Link href="/neighborhoods" className="rounded-full border border-charcoal/25 bg-white px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold">
              Explore Tampa Bay
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-white/40 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white/60 p-3 shadow-luxury">
            <div className="relative h-[520px] w-full overflow-hidden rounded-[1.5rem]">
              <RotatingImage images={agentPhotos} startIndex={0} priority className="absolute inset-0" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

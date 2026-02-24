import Link from "next/link";

export function CtaBand() {
  return (
    <section className="rounded-3xl bg-charcoal px-7 py-10 text-white shadow-luxury md:flex md:items-center md:justify-between md:px-10">
      <div>
        <p className="font-serif text-3xl">Let&apos;s Position Your Next Move with Confidence.</p>
        <p className="mt-2 text-sm text-white/75">Reach out for buying, selling, and neighborhood guidance throughout Tampa Bay.</p>
      </div>
      <Link href="/contact" className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm text-charcoal md:mt-0">
        Schedule a Consultation
      </Link>
    </section>
  );
}

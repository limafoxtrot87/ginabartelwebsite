import { clientReviews } from "@/data/reviews";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const featured = clientReviews.slice(0, 3);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {featured.map((item) => (
        <article key={`${item.reviewer}-${item.date}`} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
          <Stars />
          <p className="mt-3 text-sm leading-relaxed text-charcoal/80">&ldquo;{item.summary}&rdquo;</p>
          <p className="mt-4 font-serif text-base">{item.reviewer}</p>
          <p className="text-xs text-charcoal/60">{item.transaction} | {item.location}</p>
          <p className="text-xs text-charcoal/60">{item.date}</p>
        </article>
      ))}
    </div>
  );
}

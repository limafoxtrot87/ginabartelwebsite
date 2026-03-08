import type { Metadata } from "next";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { awardRecognitions } from "@/data/awards";
import { clientReviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "5-Star Tampa Bay Realtor Reviews",
  description:
    "Gina Bartel holds a perfect 5.0 Zillow rating (2021–2025). Recognized for family relocation, local knowledge, and smooth closings across Tampa Bay.",
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: clientReviews.map((review, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: review.reviewer },
      datePublished: review.date,
      reviewBody: review.summary,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      itemReviewed: {
        "@type": "RealEstateAgent",
        name: "Gina Bartel",
        url: "https://ginabartelwebsite.vercel.app",
      },
    },
  })),
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-gold text-gold" : "fill-charcoal/15 text-charcoal/15"}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AwardsPage() {
  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Awards & Recognition</p>
          <h1 className="mt-2 font-serif text-4xl">Client-Driven Professional Recognition</h1>
          <p className="mt-3 max-w-3xl text-charcoal/75">
            Gina&apos;s strongest recognitions come directly from consistent client outcomes: 5-star experiences, trusted local guidance, and smooth closings.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="grid gap-5 md:grid-cols-3">
          {awardRecognitions.map((award) => (
            <article key={award.title} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.12em] text-gold">{award.year}</p>
              <h2 className="mt-2 font-serif text-2xl">{award.title}</h2>
              <p className="mt-2 text-sm text-charcoal/60">{award.issuer}</p>
              <p className="mt-4 text-sm text-charcoal/80">{award.description}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <section className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs uppercase tracking-[0.12em] text-gold">Recent 5-Star Reviews</p>
          <div className="mt-4 space-y-4">
            {clientReviews.map((review) => (
              <article key={`${review.reviewer}-${review.date}`} className="rounded-xl border border-charcoal/10 p-4">
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm text-charcoal/80">&ldquo;{review.summary}&rdquo;</p>
                <p className="mt-3 font-medium text-charcoal">{review.reviewer}</p>
                <p className="text-xs text-charcoal/60">{review.transaction} | {review.location} | {review.date}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}

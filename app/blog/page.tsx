import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Tampa Bay Real Estate Market Updates & Guides",
  description:
    "Market updates, neighborhood guides, and VA loan tips from Gina Bartel — Tampa Bay real estate agent. Serving Fish Hawk, Riverview, Lithia, and 14 more communities.",
};

const categoryColors: Record<string, string> = {
  "Market Update": "bg-blue-50 text-blue-700 border-blue-200",
  "Neighborhood Guide": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Military Families": "bg-amber-50 text-amber-700 border-amber-200",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Tampa Bay Real Estate Insights — Gina Bartel",
  url: "https://ginabartelwebsite.vercel.app/blog",
  author: {
    "@type": "Person",
    name: "Gina Bartel",
    url: "https://ginabartelwebsite.vercel.app/about",
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://ginabartelwebsite.vercel.app/blog/${post.slug}`,
    author: { "@type": "Person", name: "Gina Bartel" },
  })),
};

export default function BlogPage() {
  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <FadeInSection>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Market Updates & Guides</p>
          <h1 className="mt-2 font-serif text-4xl">Tampa Bay Real Estate Insights</h1>
          <p className="mt-3 max-w-2xl text-charcoal/75">
            Practical guidance on the Tampa Bay housing market, neighborhood comparisons, and homebuying strategy — from a local agent who works here every day.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft transition hover:shadow-luxury"
            >
              <span
                className={`self-start rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] ?? "bg-charcoal/5 text-charcoal/60 border-charcoal/10"}`}
              >
                {post.category}
              </span>
              <h2 className="mt-3 font-serif text-xl leading-snug group-hover:text-gold transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-charcoal/70 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t border-charcoal/8 pt-4 text-xs text-charcoal/50">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <span>{post.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 text-center shadow-soft md:p-8">
          <p className="font-serif text-2xl">Have a question about the Tampa Bay market?</p>
          <p className="mt-2 text-charcoal/70">
            I&apos;m happy to walk you through current conditions for any community or price range.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-full bg-charcoal px-7 py-3 text-sm text-white transition hover:bg-charcoal/90"
          >
            Ask Gina
          </Link>
        </div>
      </FadeInSection>
    </div>
  );
}

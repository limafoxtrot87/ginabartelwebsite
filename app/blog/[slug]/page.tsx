import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://ginabartelrealestate.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Gina Bartel",
      url: "https://ginabartelrealestate.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Florida Executive Realty",
      url: "https://www.floridaexecutiverealty.com/",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ginabartelrealestate.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ginabartelrealestate.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://ginabartelrealestate.com/blog/${post.slug}` },
    ],
  };

  const paragraphs = post.body.split("\n\n");

  return (
    <div className="pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb nav */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal/50" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-charcoal/70 truncate max-w-xs">{post.category}</span>
      </nav>

      <article className="mx-auto max-w-2xl">
        <header className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">{post.category}</p>
          <h1 className="font-serif text-4xl leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-charcoal/50">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>Gina Bartel</span>
          </div>
        </header>

        <div className="prose prose-charcoal max-w-none space-y-5 text-charcoal/85 leading-relaxed">
          {paragraphs.map((para, i) => {
            // Render bold (**text**) inline
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            const content = parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="font-semibold text-charcoal">{part.slice(2, -2)}</strong>;
              }
              return part;
            });
            return <p key={i}>{content}</p>;
          })}
        </div>

        <footer className="mt-10 border-t border-charcoal/10 pt-8 space-y-4">
          <p className="font-serif text-xl">Questions about the Tampa Bay market?</p>
          <p className="text-charcoal/70">Reach out directly — I&apos;m happy to walk through any of this for your specific situation.</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/contact"
              className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90"
            >
              Contact Gina
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-charcoal/20 px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold"
            >
              ← All Articles
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}

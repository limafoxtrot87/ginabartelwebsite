import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";

export const metadata: Metadata = {
  title: "VA Loans & Military Relocation Tampa Bay",
  description:
    "Tampa Bay real estate for military families. VA loan expertise, PCS relocation support, and MacDill AFB knowledge. Gina Bartel, Florida Executive Realty.",
};
import { RotatingImage } from "@/components/shared/RotatingImage";
import { agentPhotos } from "@/data/agentPhotos";

const strengths = [
  {
    title: "VA Loan Strategy",
    body: "Gina understands VA financing structure, appraisal realities, and offer strategy tailored to veteran and active-duty buyers."
  },
  {
    title: "PCS Transition Support",
    body: "From remote tours to compressed timelines, Gina helps military families navigate relocations with clear communication and fast execution."
  },
  {
    title: "MacDill & CENTCOM Awareness",
    body: "She knows commuting patterns and neighborhood fit considerations tied to MacDill AFB and CENTCOM work routines."
  },
  {
    title: "Veteran Family Perspective",
    body: "As the wife of an OEF/OIF Marine veteran, Gina brings personal understanding and practical empathy to military-family priorities."
  },
  {
    title: "Assumable VA Rate Homes",
    body: "Gina actively tracks and evaluates assumable VA opportunities and helps clients assess when those terms create true value."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Gina Bartel work with VA loans in Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Gina understands VA financing structure, appraisal realities, and offer strategy tailored to veteran and active-duty buyers purchasing homes near MacDill AFB and across Tampa Bay."
      }
    },
    {
      "@type": "Question",
      name: "Can Gina help with a PCS relocation to Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Gina helps military families navigate PCS relocations with clear communication, fast execution, remote tours, and neighborhood matching based on commute to MacDill AFB, schools, and family routine."
      }
    },
    {
      "@type": "Question",
      name: "What neighborhoods are close to MacDill AFB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gina serves 17 Tampa Bay communities including South Tampa, Tampa, Apollo Beach, Riverview, and Lithia — all with varying commute distances to MacDill AFB. She provides commute-specific guidance for each area."
      }
    },
    {
      "@type": "Question",
      name: "Does Gina know about assumable VA rate homes in Tampa Bay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Gina actively tracks and evaluates assumable VA mortgage opportunities and helps clients assess when those terms create genuine value compared to current market rates."
      }
    },
    {
      "@type": "Question",
      name: "What can military families expect when working with Gina Bartel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fast response windows for high-tempo relocation timelines, virtual and in-person showing strategy built around PCS realities, neighborhood matching based on commute and schools, and clear guidance on VA eligibility-sensitive decisions."
      }
    },
    {
      "@type": "Question",
      name: "Does Gina have personal experience with military families?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. As the wife of an OEF/OIF Marine veteran, Gina brings personal understanding and practical empathy to military-family priorities when buying or selling a home in Tampa Bay."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ginabartelrealestate.com" },
    { "@type": "ListItem", position: 2, name: "Military Families", item: "https://ginabartelrealestate.com/military-families" },
  ],
};

export default function MilitaryFamiliesPage() {
  return (
    <div className="space-y-8 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FadeInSection>
        <section className="grid gap-6 rounded-3xl border border-charcoal/10 bg-white p-7 shadow-soft md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-gold">Military Families</p>
            <h1 className="mt-2 font-serif text-4xl">Mission-Focused Real Estate Support</h1>
            <p className="mt-4 max-w-3xl text-charcoal/80">
              Military moves require speed, precision, and trust. Gina helps active-duty and veteran families execute with confidence,
              whether you are relocating to Tampa Bay, transitioning through PCS, or evaluating VA-specific financing opportunities.
            </p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl border border-charcoal/10">
            <RotatingImage images={agentPhotos} startIndex={2} className="absolute inset-0" />
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <div className="grid gap-5 md:grid-cols-2">
          {strengths.map((item) => (
            <article key={item.title} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-luxury">
              <h2 className="font-serif text-2xl">{item.title}</h2>
              <p className="mt-3 text-charcoal/80">{item.body}</p>
            </article>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <section className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-serif text-3xl">What You Can Expect</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-charcoal/80">
            <li>Fast response windows for high-tempo relocation timelines</li>
            <li>Virtual and in-person showing strategy built around PCS realities</li>
            <li>Neighborhood matching based on commute, schools, and family routine</li>
            <li>Clear guidance on VA eligibility-sensitive decisions and assumptions</li>
          </ul>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90">
            Schedule a Military Family Consultation
          </Link>
        </section>
      </FadeInSection>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gina Bartel | Tampa Bay Real Estate Agent & Realtor",
  description:
    "Meet Gina Bartel — Tampa Bay real estate agent with Florida Executive Realty. Chicago native, Florida expert. Serving 17 communities with a family-first approach since 2018.",
};
import { RotatingImage } from "@/components/shared/RotatingImage";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { agentPhotos } from "@/data/agentPhotos";
import { serviceAreas } from "@/data/serviceAreas";
import { socialLinks } from "@/data/socialLinks";

const stats = [
  { value: "50+", label: "Homes Closed" },
  { value: "$32M+", label: "In Transactions" },
  { value: "17", label: "Communities Served" },
  { value: "5.0", label: "Zillow Rating" },
];

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-10">
      <FadeInSection>
        <div className="grid gap-4 rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft md:grid-cols-4 md:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl text-charcoal">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-charcoal/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
        <FadeInSection className="space-y-5">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">About Gina</p>
          <h1 className="font-serif text-4xl">Tampa Bay Real Estate Agent — Gina Bartel</h1>
          <p className="text-charcoal/80">
            I&apos;m a Chicago native who traded Midwest winters for Florida sunshine in 2018, and I&apos;ve loved helping families
            build their next chapter in Tampa Bay ever since. From Fish Hawk and South Tampa to St. Petersburg and Lutz, I know
            how different each local community feels and how to help you find the right fit.
          </p>
          <p className="text-charcoal/80">
            Clients often tell me they appreciate my positive energy and genuine, no-pressure approach. I believe buying or
            selling a home should feel organized, informed, and even fun, with fewer bumps and more confidence throughout the process.
          </p>
          <p className="text-charcoal/80">
            I work with primary residences, snowbird homes, luxury properties, investment opportunities, and first-time buyers.
            As a proud wife of a Marine Corps veteran, I also value every opportunity to support active-duty and retired military families.
          </p>
          <p className="text-charcoal/80">
            When I&apos;m not working, you&apos;ll usually find me at my kids&apos; sporting events, trying great local restaurants,
            out on a boat, or at the beach. My Midwest roots and family values still guide everything I do:
            honesty, integrity, and a true client-first experience.
          </p>
          <p className="text-charcoal/80">
            Brokerage:{" "}
            <Link href="https://www.floridaexecutiverealty.com/" target="_blank" className="font-medium text-gold hover:underline">
              Florida Executive Realty
            </Link>
          </p>
          <div>
            <p className="font-medium text-charcoal">Service Areas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="rounded-full border border-charcoal/15 px-3 py-1 text-sm transition hover:border-gold hover:text-gold"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-charcoal">Connect</p>
            <div className="mt-3 flex gap-4 text-sm">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" className="hover:text-gold">
                  {social.label}
                </Link>
              ))}
            </div>
            <a href="mailto:gina@floridaexecutiverealty.com" className="mt-2 block text-sm text-charcoal/70 hover:text-gold transition-colors">
              gina@floridaexecutiverealty.com
            </a>
            <a href="tel:7087818205" className="mt-1 block text-sm text-charcoal/70 hover:text-gold transition-colors">
              708-781-8205
            </a>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white p-3 shadow-luxury">
            <div className="relative h-[560px] w-full overflow-hidden rounded-[1.5rem]">
              <RotatingImage images={agentPhotos} startIndex={1} className="absolute inset-0" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

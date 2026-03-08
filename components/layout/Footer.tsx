import Link from "next/link";
import { SocialEmblems } from "@/components/shared/SocialEmblems";

const navLinks = [
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Sold Homes", href: "/sold-homes" },
  { label: "Explore Tampa", href: "/neighborhoods" },
  { label: "Military Families", href: "/military-families" },
  { label: "Awards", href: "/awards" },
  { label: "Market Updates", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-charcoal/10 bg-white/70">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-2">
            <p className="font-serif text-lg text-charcoal">Gina Bartel</p>
            <p className="text-sm text-charcoal/70">
              <a href="https://www.floridaexecutiverealty.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                Florida Executive Realty
              </a>
            </p>
            <p className="text-sm text-charcoal/70">5801 Village Center Dr, Lithia, FL</p>
            <a href="tel:7087818205" className="block text-sm text-charcoal/70 hover:text-gold transition-colors">
              708-781-8205
            </a>
            <a href="mailto:gina@floridaexecutiverealty.com" className="block text-sm text-charcoal/70 hover:text-gold transition-colors">
              gina@floridaexecutiverealty.com
            </a>
            <div className="pt-1">
              <SocialEmblems showLabels />
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-gold">Navigate</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-charcoal/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-gold">Serving Tampa Bay</p>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              17 communities across Hillsborough County and the greater Tampa Bay region.
            </p>
            <Link
              href="/service-areas"
              className="mt-3 inline-block text-sm text-gold hover:underline"
            >
              View All Areas →
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-charcoal/10 pt-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between text-xs text-charcoal/50">
          <p>© {new Date().getFullYear()} Gina Bartel. All rights reserved.</p>
          <p>Equal Housing Opportunity · Licensed Florida Real Estate Agent</p>
        </div>
      </div>
    </footer>
  );
}

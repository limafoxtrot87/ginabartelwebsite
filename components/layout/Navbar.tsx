"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Gina" },
  { href: "/military-families", label: "Military Families" },
  { href: "/awards", label: "Awards" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/sold-homes", label: "Sold Homes" },
  { href: "/neighborhoods", label: "Explore Tampa!" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-serif text-xl text-charcoal">
          Gina Bartel
        </Link>
        <div className="flex items-center gap-5 overflow-x-auto text-sm">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className="group relative pb-1 text-charcoal/90 whitespace-nowrap">
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

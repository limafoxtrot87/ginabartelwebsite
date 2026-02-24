import Link from "next/link";
import { socialLinks } from "@/data/socialLinks";

type SocialEmblemsProps = {
  showLabels?: boolean;
};

const iconClass = "h-4 w-4";

function iconFor(label: string) {
  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" className={iconClass} fill="currentColor">
          <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" className={iconClass} fill="currentColor">
          <path d="M6 9h3v9H6V9zm1.5-4a1.7 1.7 0 110 3.4 1.7 1.7 0 010-3.4zM11 9h3v1.3c.6-1 1.7-1.6 3-1.6 2.3 0 4 1.5 4 4.7V18h-3v-4.1c0-1.4-.6-2.2-1.8-2.2-1.3 0-2 .9-2 2.2V18h-3V9z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 12l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
  }
}

export function SocialEmblems({ showLabels = false }: SocialEmblemsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-3 py-1.5 text-charcoal/80 transition hover:border-gold hover:text-gold"
          aria-label={link.label}
        >
          {iconFor(link.label)}
          {showLabels ? <span className="text-xs">{link.label}</span> : null}
        </Link>
      ))}
    </div>
  );
}

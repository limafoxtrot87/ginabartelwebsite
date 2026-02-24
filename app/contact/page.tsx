import Link from "next/link";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { RotatingImage } from "@/components/shared/RotatingImage";
import { interiorPhotos } from "@/data/interiorPhotos";
import { socialLinks } from "@/data/socialLinks";

export default function ContactPage() {
  return (
    <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.1fr]">
      <FadeInSection>
        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
          <p className="text-xs uppercase tracking-[0.14em] text-gold">Contact Gina</p>
          <h1 className="mt-2 font-serif text-4xl">Let&apos;s Plan Your Family&apos;s Next Move</h1>
          <p className="mt-3 text-sm text-charcoal/70">
            Share a few details below so we can tailor listings, neighborhoods, and strategy around your goals.
          </p>

          <form className="mt-6 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                Full Name
                <input type="text" className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm">
                Email
                <input type="email" className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                Phone
                <input type="tel" className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm">
                Preferred Contact Method
                <select className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold">
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Text</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                I&apos;m Interested In
                <select className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold">
                  <option>Buying</option>
                  <option>Selling</option>
                  <option>Buying & Selling</option>
                  <option>Investment Property</option>
                </select>
              </label>
              <label className="block text-sm">
                Timeline
                <select className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold">
                  <option>Immediately</option>
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>6+ Months</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block text-sm">
                Price Range
                <input type="text" placeholder="$400k - $700k" className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm">
                Beds Needed
                <input type="number" min={1} className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm">
                Baths Needed
                <input type="number" min={1} step="0.5" className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
              </label>
            </div>

            <label className="block text-sm">
              Preferred Areas / Neighborhoods
              <input
                type="text"
                placeholder="Example: Fish Hawk, South Tampa, Bloomingdale"
                className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
              />
            </label>

            <label className="block text-sm">
              Family Priorities
              <textarea
                rows={4}
                placeholder="Tell us what matters most: school zones, commute time, yard size, walkability, waterfront, HOA preferences, etc."
                className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
              />
            </label>

            <label className="block text-sm">
              Additional Notes
              <textarea rows={4} className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold" />
            </label>

            <button type="submit" className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90">
              Submit Consultation Request
            </button>
          </form>

          <div className="mt-6 border-t border-charcoal/10 pt-4 text-sm text-charcoal/80">
            <p>Phone: 708-781-8205</p>
            <p>Email: Gina@FloridaExecutiveRealty.com</p>
            <p>Office: 5801 Village Center Dr, Lithia, FL</p>
            <div className="mt-3 flex gap-4">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" className="hover:text-gold">
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
          <div className="relative h-[780px] w-full">
            <RotatingImage images={interiorPhotos} startIndex={1} className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 via-charcoal/30 to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-[0.14em] text-gold">Inside Tampa Bay Homes</p>
              <p className="mt-2 font-serif text-2xl">Design, Comfort, and Lifestyle</p>
              <p className="mt-2 text-sm text-white/80">From bright kitchens to waterfront lanais, Gina helps families find spaces that truly feel like home.</p>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

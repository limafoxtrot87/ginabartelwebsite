"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { RotatingImage } from "@/components/shared/RotatingImage";
import { interiorPhotos } from "@/data/interiorPhotos";
import { socialLinks } from "@/data/socialLinks";

function ContactForm() {
  const searchParams = useSearchParams();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "Email",
    interest: "Buying",
    timeline: "1-3 Months",
    priceRange: "",
    beds: "",
    baths: "",
    areas: "",
    priorities: "",
    notes: "",
    listing: "",
    subject: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const listing = searchParams.get("listing") ?? "";
    const subject = searchParams.get("subject") ?? "";
    if (listing || subject) {
      setFields((prev) => ({ ...prev, listing, subject }));
    }
  }, [searchParams]);

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-soft text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-serif text-2xl text-charcoal">Message Sent!</p>
        <p className="mt-2 text-sm text-charcoal/70">
          Gina will be in touch shortly. You can also reach her directly at{" "}
          <a href="mailto:gina@floridaexecutiverealty.com" className="text-gold hover:underline">
            gina@floridaexecutiverealty.com
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-charcoal/20 px-5 py-2 text-sm transition hover:border-gold hover:text-gold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft md:p-8">
      <p className="text-xs uppercase tracking-[0.14em] text-gold">Contact Gina</p>
      <h1 className="mt-2 font-serif text-4xl">Let&apos;s Plan Your Family&apos;s Next Move</h1>
      <p className="mt-3 text-sm text-charcoal/70">
        Share a few details below so we can tailor listings, neighborhoods, and strategy around your goals.
      </p>

      {fields.listing && (
        <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 px-4 py-2.5 text-sm text-charcoal/80">
          Re: <span className="font-medium">{fields.subject || fields.listing}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            Full Name <span className="text-gold">*</span>
            <input
              type="text"
              required
              value={fields.name}
              onChange={set("name")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <label className="block text-sm">
            Email <span className="text-gold">*</span>
            <input
              type="email"
              required
              value={fields.email}
              onChange={set("email")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            Phone
            <input
              type="tel"
              value={fields.phone}
              onChange={set("phone")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <label className="block text-sm">
            Preferred Contact Method
            <select
              value={fields.preferredContact}
              onChange={set("preferredContact")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold"
            >
              <option>Email</option>
              <option>Phone</option>
              <option>Text</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            I&apos;m Interested In
            <select
              value={fields.interest}
              onChange={set("interest")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold"
            >
              <option>Buying</option>
              <option>Selling</option>
              <option>Buying &amp; Selling</option>
              <option>Investment Property</option>
            </select>
          </label>
          <label className="block text-sm">
            Timeline
            <select
              value={fields.timeline}
              onChange={set("timeline")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 bg-white px-3 py-2 outline-none focus:border-gold"
            >
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
            <input
              type="text"
              placeholder="$400k - $700k"
              value={fields.priceRange}
              onChange={set("priceRange")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <label className="block text-sm">
            Beds Needed
            <input
              type="number"
              min={1}
              value={fields.beds}
              onChange={set("beds")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
          <label className="block text-sm">
            Baths Needed
            <input
              type="number"
              min={1}
              step="0.5"
              value={fields.baths}
              onChange={set("baths")}
              className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="block text-sm">
          Preferred Areas / Neighborhoods
          <input
            type="text"
            placeholder="Example: Fish Hawk, South Tampa, Bloomingdale"
            value={fields.areas}
            onChange={set("areas")}
            className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
          />
        </label>

        <label className="block text-sm">
          Family Priorities
          <textarea
            rows={4}
            placeholder="Tell us what matters most: school zones, commute time, yard size, walkability, waterfront, HOA preferences, etc."
            value={fields.priorities}
            onChange={set("priorities")}
            className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
          />
        </label>

        <label className="block text-sm">
          Additional Notes
          <textarea
            rows={4}
            value={fields.notes}
            onChange={set("notes")}
            className="mt-1 w-full rounded-xl border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
          />
        </label>

        {status === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-charcoal px-5 py-2.5 text-sm text-white transition hover:bg-charcoal/90 disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Submit Consultation Request"}
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
  );
}

export default function ContactPage() {
  return (
    <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.1fr]">
      <FadeInSection>
        <Suspense fallback={<div className="rounded-2xl border border-charcoal/10 bg-white p-8 shadow-soft" />}>
          <ContactForm />
        </Suspense>
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

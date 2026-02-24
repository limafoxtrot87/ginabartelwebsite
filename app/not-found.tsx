import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-10 text-center shadow-soft">
      <h1 className="font-serif text-3xl">Page Not Found</h1>
      <p className="mt-2 text-charcoal/75">The page you requested does not exist.</p>
      <Link href="/" className="mt-5 inline-block text-gold hover:underline">
        Return Home
      </Link>
    </div>
  );
}

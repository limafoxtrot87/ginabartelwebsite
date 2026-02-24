import Link from "next/link";

export default function ErrorRoutePage() {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-10 text-center shadow-soft">
      <h1 className="font-serif text-3xl">Use the Main Site Navigation</h1>
      <p className="mt-2 text-charcoal/75">
        This path is not part of the public website. Continue to the homepage.
      </p>
      <Link href="/" className="mt-5 inline-block text-gold hover:underline">
        Go to Home
      </Link>
    </div>
  );
}

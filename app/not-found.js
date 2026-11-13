import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold uppercase">Page not found</h1>
      <p className="mt-3 text-muted">That page skipped leg day. Head back to the library.</p>
      <Link href="/" className="btn-primary mt-8">Go to workouts</Link>
    </div>
  );
}

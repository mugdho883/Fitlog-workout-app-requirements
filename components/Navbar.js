"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const onPlan = path.startsWith("/my-plan");

  const link = (active) =>
    `rounded-md px-3 py-1.5 font-display text-sm uppercase tracking-wider transition ${
      active ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <img src="/logo.png" alt="" width="28" height="28" />
          <span className="hidden font-display text-xl font-bold tracking-wider sm:inline">FITLOG</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link href="/" className={link(!onPlan)} aria-current={!onPlan ? "page" : undefined}>
            Workout
          </Link>
          <Link href="/my-plan" className={link(onPlan)} aria-current={onPlan ? "page" : undefined}>
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black sm:text-sm"
            aria-label={`Plan: ${plan.length}`}
          >
            Plan <span className="ml-0.5">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-accent px-3 py-1 text-xs font-bold text-accent sm:text-sm"
            aria-label={`Saved: ${saved.length}`}
          >
            Saved <span className="ml-0.5">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

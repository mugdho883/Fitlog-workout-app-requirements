"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ChevronDown, Search } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

const SORTS = {
  duration: { label: "Duration", fn: (a, b) => a.duration - b.duration },
  calories: { label: "Calories", fn: (a, b) => b.caloriesBurned - a.caloriesBurned },
  rating: { label: "Rating", fn: (a, b) => b.rating - a.rating },
};

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("duration");
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchWorkouts()
      .then(setItems)
      .catch(() => setError("Could not load workouts. Check your connection and refresh."))
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items
      .filter((w) => !term || w.name.toLowerCase().includes(term) || w.muscleGroups.some((m) => m.toLowerCase().includes(term)))
      .sort(SORTS[sort].fn);
  }, [items, sort, q]);

  return (
    <>
      <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 font-display text-sm uppercase tracking-[0.25em] text-accent">Workout Library</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="btn-primary mt-8">
            Browse workouts <ArrowDown size={18} />
          </a>
        </div>
        <div className="flex justify-center rounded-2xl border border-line bg-panel p-6">
          <img src="/banner.png" alt="Preacher curl machine with the working muscles highlighted" className="h-auto max-h-[420px] w-auto max-w-full" />
        </div>
      </section>

      <section id="library" className="scroll-mt-20 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
            <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search workouts</span>
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or muscle"
                className="w-full rounded-lg border border-line bg-panel py-2.5 pl-9 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none sm:w-60"
              />
            </label>
            <label className="relative">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-line bg-panel py-2.5 pl-4 pr-10 text-sm focus:border-accent focus:outline-none sm:w-auto"
              >
                {Object.entries(SORTS).map(([k, s]) => (
                  <option key={k} value={k}>Sort By: {s.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent" />
            </label>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="py-16 text-center text-red-400">{error}</p>
        ) : list.length === 0 ? (
          <p className="py-16 text-center text-muted">No workouts match &ldquo;{q}&rdquo;.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
          </div>
        )}
      </section>
    </>
  );
}

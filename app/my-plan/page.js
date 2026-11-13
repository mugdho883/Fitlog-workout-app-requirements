"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Eye, Plus, X } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import { usePlan } from "@/components/PlanProvider";
import { Stats } from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

export default function MyPlan() {
  const { plan, saved, done, ready, addToPlan, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("plan");

  useEffect(() => {
    fetchWorkouts()
      .then(setAll)
      .catch(() => setError("Could not load workouts. Refresh to try again."))
      .finally(() => setLoading(false));
  }, []);

  const pick = (ids) => ids.map((id) => all.find((w) => w.id === id)).filter(Boolean);
  const planItems = pick(plan);
  const savedItems = pick(saved);
  const list = tab === "plan" ? planItems : savedItems;

  const stats = [
    ["Exercises", planItems.length],
    ["Minutes", planItems.reduce((n, w) => n + w.duration, 0)],
    ["Calories", planItems.reduce((n, w) => n + w.caloriesBurned, 0)],
  ];

  return (
    <div className="py-10 md:py-14">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
        {stats.map(([label, val]) => (
          <div key={label} className="rounded-xl border border-line bg-panel p-4 sm:p-6">
            <p className="font-display text-3xl font-bold text-accent sm:text-5xl">{val}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-2 border-b border-line" role="tablist">
        {[["plan", "Today's Plan", plan.length], ["saved", "Saved", saved.length]].map(([key, label, n]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-3 font-display text-sm uppercase tracking-wider transition ${
              tab === key ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
            }`}
          >
            {label} ({n})
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading || !ready ? (
          <Loader />
        ) : error ? (
          <p className="py-16 text-center text-red-400">{error}</p>
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase">Nothing here yet</h2>
            <p className="mt-2 text-muted">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="btn-primary mt-6">Go to workouts</Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((w) => {
              const isDone = done.includes(w.id);
              return (
                <li key={w.id} className={`flex flex-col gap-4 rounded-xl border bg-panel p-4 sm:flex-row sm:items-center ${isDone ? "border-accent/60" : "border-line"}`}>
                  <img src={w.image} alt={w.name} className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-32" />
                  <div className="flex-1">
                    <h3 className={`font-display text-xl font-semibold uppercase ${isDone ? "text-muted line-through" : ""}`}>{w.name}</h3>
                    <p className="mb-2 text-sm text-muted">{w.equipment}</p>
                    <Stats w={w} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/workout/${w.id}`} className="btn-outline !px-4 !py-2">
                      <Eye size={16} /> View Details
                    </Link>
                    {tab === "plan" ? (
                      <button onClick={() => markDone(w.id)} disabled={isDone} className="btn-primary !px-4 !py-2">
                        <Check size={16} /> {isDone ? "Done" : "Mark as Done"}
                      </button>
                    ) : (
                      <button onClick={() => addToPlan(w.id)} className="btn-primary !px-4 !py-2">
                        <Plus size={16} /> Add to plan
                      </button>
                    )}
                    <button
                      onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                      aria-label={`Remove ${w.name}`}
                      className="rounded-lg border border-line p-2.5 text-muted transition hover:border-red-500 hover:text-red-400"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

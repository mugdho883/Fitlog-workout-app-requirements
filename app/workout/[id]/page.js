"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Bookmark, Plus, ArrowLeft } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import { PLAN_CAP, usePlan } from "@/components/PlanProvider";
import Loader from "@/components/Loader";

export default function WorkoutDetail() {
  const { id } = useParams();
  const { plan, addToPlan, addToSaved } = usePlan();
  const [w, setW] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    setState("loading");
    fetchWorkout(id)
      .then((d) => { setW(d); setState("ok"); })
      .catch((e) => setState(e.message === "NOT_FOUND" ? "missing" : "error"));
  }, [id]);

  if (state === "loading") return <Loader label="Loading workout…" />;
  if (state !== "ok") {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-4xl font-bold uppercase">
          {state === "missing" ? "Workout not found" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-muted">
          {state === "missing" ? "That lift isn't in the library." : "We couldn't load this workout. Try again."}
        </p>
        <Link href="/" className="btn-primary mt-8">Go to workouts</Link>
      </div>
    );
  }

  const full = plan.length >= PLAN_CAP && !plan.includes(w.id);
  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <div className="py-8 md:py-12">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowLeft size={16} /> Back to library
      </Link>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <img src={w.image} alt={w.name} className="h-full max-h-[640px] w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">{w.name}</h1>
          <p className="mt-3 text-lg text-muted">{w.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}
          </div>

          <dl className="mt-8 divide-y divide-line rounded-xl border border-line bg-panel">
            {specs.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-5 py-3">
                <dt className="font-display text-sm uppercase tracking-wider text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 font-display text-2xl font-semibold uppercase">Instructions</h2>
          <ol className="mt-4 space-y-3">
            {w.instructions.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-black">{i + 1}</span>
                <span className="pt-0.5 text-white/90">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => addToPlan(w.id)} disabled={full} className="btn-primary">
              <Plus size={18} /> Add to today&apos;s plan
            </button>
            <button onClick={() => addToSaved(w.id)} className="btn-outline">
              <Bookmark size={18} /> Save for later
            </button>
          </div>
          {full && <p className="mt-3 text-sm text-red-400">Today&apos;s plan is full ({PLAN_CAP} lifts). Finish or remove one first.</p>}
        </div>
      </div>
    </div>
  );
}

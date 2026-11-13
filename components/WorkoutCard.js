import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export function Stats({ w }) {
  return (
    <div className="flex items-center gap-4 text-sm text-white">
      <span className="flex items-center gap-1.5"><Clock size={15} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame size={15} className="text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1.5"><Star size={15} className="text-accent" />{w.rating}</span>
    </div>
  );
}

export default function WorkoutCard({ w }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img src={w.image} alt={w.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <div className="mt-auto border-t border-line pt-3"><Stats w={w} /></div>
      </div>
    </Link>
  );
}

"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const PLAN_CAP = 5;
const KEY = "fitlog:v1";
const Ctx = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);
  const timer = useRef(null);

  // Restore from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(raw.plan)) setPlan(raw.plan);
      if (Array.isArray(raw.saved)) setSaved(raw.saved);
      if (Array.isArray(raw.done)) setDone(raw.done);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ plan, saved, done }));
    } catch {}
  }, [plan, saved, done, ready]);

  const notify = useCallback((message, type = "success") => {
    clearTimeout(timer.current);
    setToast({ message, type, id: Date.now() });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToPlan = (id) => {
    if (plan.includes(id)) return notify("Already in today's plan", "info");
    if (plan.length >= PLAN_CAP) return notify(`Plan is full — max ${PLAN_CAP} lifts`, "error");
    setPlan([...plan, id]);
    notify("Added to today's plan");
  };

  const addToSaved = (id) => {
    if (saved.includes(id)) return notify("Already saved", "info");
    setSaved([...saved, id]);
    notify("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((x) => x !== id));
    setDone(done.filter((x) => x !== id));
    notify("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((x) => x !== id));
    notify("Removed from saved");
  };

  const markDone = (id) => {
    if (done.includes(id)) return notify("Already marked as done", "info");
    setDone([...done, id]);
    notify("Nice work — marked as done");
  };

  return (
    <Ctx.Provider
      value={{ plan, saved, done, ready, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`toast-in fixed bottom-6 left-1/2 z-50 max-w-[90vw] rounded-lg border px-5 py-3 text-sm font-medium shadow-xl ${
            toast.type === "error"
              ? "border-red-500 bg-red-950 text-red-100"
              : "border-accent bg-panel text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </Ctx.Provider>
  );
}

export const usePlan = () => useContext(Ctx);

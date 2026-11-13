const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function request(suffix = "") {
  let lastError = new Error("Request failed");
  for (const base of BASES) {
    try {
      const res = await fetch(base + suffix);
      if (!res.ok) throw new Error(res.status === 404 ? "NOT_FOUND" : "Request failed");
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function fetchWorkouts() {
  const data = await request();
  return Array.isArray(data) ? data : [];
}

export async function fetchWorkout(id) {
  const data = await request(`/${id}`);
  if (!data || typeof data !== "object" || !data.id) throw new Error("NOT_FOUND");
  return data;
}

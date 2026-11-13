# 🏋️ FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion: browse a library of lifts, lock your picks into today's plan, save others for later, and watch your daily minutes and calories add up.

**Live:** _add your deployed link here_

## Technologies Used

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18
- Tailwind CSS 3
- Lucide React icons
- Oswald + Inter (Google Fonts)

## Key Features

1. **Workout library** — responsive 3-column card grid fetched from the FitLog API, with a loading animation and API fallback.
2. **Sort & search** — sort by Duration, Calories or Rating; search by name or muscle group.
3. **Workout detail page** — large visual, key specs panel and numbered instructions.
4. **Today's plan (5-lift cap)** — add lifts, with live Exercises / Minutes / Calories metrics and navbar badge counters.
5. **Saved list** — bookmark lifts for later and move them into the plan.
6. **Mark as Done / Remove** — per-card actions with toast feedback.
7. **Persistence** — plan, saved and done state survive reloads via `localStorage`.
8. **Fully responsive** with a custom 404 page.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Data

- `GET https://api.abcz.workers.dev/api/fitlog`
- `GET https://api.abcz.workers.dev/api/fitlog/:id`
- Automatic fallback to `api.api-store.workers.dev`.

## Deployment

Push to GitHub and import the repo in Vercel — no extra configuration needed.

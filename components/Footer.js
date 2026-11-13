export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" width="28" height="28" />
          <span className="font-display text-xl font-bold tracking-wider">FITLOG</span>
        </div>
        <p className="text-sm text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}

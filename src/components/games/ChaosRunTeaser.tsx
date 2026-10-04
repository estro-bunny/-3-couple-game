import Link from "next/link";

export default function ChaosRunTeaser() {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-surface-container-low to-secondary/5 shadow-[0_0_70px_rgba(255,0,255,.08)]">
      <div className="grid gap-0 md:grid-cols-[1fr_auto] md:items-stretch">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <p className="relative text-[9px] font-black uppercase tracking-[.32em] text-primary">03 // CHAOS RUN // SESSION MODE</p>
          <h2 className="relative mt-3 font-headline text-2xl font-black tracking-[-.04em] sm:text-4xl">
            DON'T PICK JUST ONE ROOM.
          </h2>
          <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
            Pick a vibe, clear rooms, and keep the night moving. Your run stays in this browser.
            No account. No leaderboard. No weird pressure to finish.
          </p>
          <div className="relative mt-5 flex flex-wrap gap-2 text-[9px] font-black uppercase tracking-[.16em]">
            {["5 vibes", "8 rooms", "local progress", "easy exits"].map((item) => (
              <span key={item} className="rounded-lg border border-outline-variant/20 bg-surface/60 px-3 py-2 text-on-surface-variant">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center border-t border-primary/10 p-6 md:border-l md:border-t-0 md:p-8">
          <Link
            href="/games/chaos-run"
            className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-xs font-black uppercase tracking-[.18em] text-on-primary shadow-[0_0_40px_rgba(255,0,255,.25)] transition-transform hover:scale-[1.02] md:w-auto"
          >
            ENTER CHAOS RUN ♡
          </Link>
        </div>
      </div>
    </div>
  );
}

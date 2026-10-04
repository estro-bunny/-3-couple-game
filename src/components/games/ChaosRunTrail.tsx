"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHAOS_SESSION_GAMES } from "@/lib/games/chaos-session";
import { isChaosSessionComplete, parseChaosSession, type ChaosSessionState } from "@/lib/games/chaos-session-state";

const STORAGE_KEY = "coupleplayhub:chaos-session";

export default function ChaosRunTrail() {
  const [state, setState] = useState<ChaosSessionState | null>(null);

  useEffect(() => {
    const sync = () => setState(parseChaosSession(window.localStorage.getItem(STORAGE_KEY)));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("coupleplayhub:chaos-session-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("coupleplayhub:chaos-session-updated", sync);
    };
  }, []);

  if (!state?.startedAt) return null;

  const total = CHAOS_SESSION_GAMES.length;
  const cleared = state.completedSlugs.length;
  const complete = isChaosSessionComplete(state, total);
  const currentIndex = CHAOS_SESSION_GAMES.findIndex((game) => game.slug === state.currentSlug);
  const nextRoom = currentIndex >= 0 && !complete ? CHAOS_SESSION_GAMES[(currentIndex + 1) % total] : null;

  return (
    <section className="mt-6 rounded-3xl border border-secondary/15 bg-surface-container-low p-5 sm:p-6" aria-label="Chaos Run room trail">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[.3em] text-secondary">RUN MAP // {state.vibe.toUpperCase()}</p>
          <h2 className="mt-2 text-xl font-black font-headline sm:text-2xl">YOUR CHAOS TRAIL.</h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[.18em] text-on-surface-variant/60">
          {cleared}/{total} CLEARED
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CHAOS_SESSION_GAMES.map((game, index) => {
          const clearedRoom = state.completedSlugs.includes(game.slug);
          const current = state.currentSlug === game.slug;
          return (
            <div key={game.slug}
              className={"rounded-xl border p-3 transition-all " +
                (clearedRoom ? "border-primary/35 bg-primary/10" :
                  current ? "border-secondary/40 bg-secondary/10 shadow-[0_0_24px_rgba(0,229,255,.08)]" :
                  "border-outline-variant/15 bg-surface")}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[8px] font-black tracking-[.2em] text-on-surface-variant/50">{String(index + 1).padStart(2, "0")}</span>
                <span className={"text-[8px] font-black uppercase tracking-wider " +
                  (clearedRoom ? "text-primary" : current ? "text-secondary" : "text-on-surface-variant/40")}>
                  {clearedRoom ? "CLEAR" : current ? "NOW" : "NEXT"}
                </span>
              </div>
              <p className="mt-2 truncate text-xs font-black uppercase">{game.title}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/10 pt-4">
        <p className="text-[10px] font-black uppercase tracking-[.14em] text-on-surface-variant/60">
          {complete ? "RUN COMPLETE // BURROW CLEARED ♡" : nextRoom ? "NEXT ROOM // " + nextRoom.title.toUpperCase() : "CLEAR THE CURRENT ROOM. THEN COME BACK FOR THE NEXT."}
        </p>
        <Link href="/games/chaos-run"
          className="min-h-10 inline-flex items-center justify-center rounded-xl border border-secondary/35 px-4 text-[10px] font-black uppercase tracking-[.16em] text-secondary hover:bg-secondary/10">
          VIEW RUN →
        </Link>
      </div>
    </section>
  );
}

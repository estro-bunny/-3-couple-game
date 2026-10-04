"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHAOS_SESSION_GAMES } from "@/lib/games/chaos-session";
import { isChaosSessionComplete, parseChaosSession, type ChaosSessionState } from "@/lib/games/chaos-session-state";

const STORAGE_KEY = "coupleplayhub:chaos-session";

export default function ChaosRunHud({ currentSlug }: { currentSlug: string }) {
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
  const current = CHAOS_SESSION_GAMES.find((game) => game.slug === currentSlug);
  const isCurrentCleared = state.completedSlugs.includes(currentSlug);
  const progress = Math.min(100, Math.round((cleared / total) * 100));

  return (
    <aside className="mb-5 overflow-hidden rounded-2xl border border-primary/25 bg-primary/5 shadow-[0_0_45px_rgba(255,0,255,.06)]" aria-label="Chaos Run progress">
      <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,0,255,.8)]" />
              CHAOS RUN // ACTIVE
            </span>
            <span className="text-[9px] font-black uppercase tracking-[.18em] text-on-surface-variant/60">
              {state.vibe} vibe
            </span>
          </div>
          <p className="mt-2 truncate text-sm font-black uppercase tracking-wide">
            {complete ? "RUN COMPLETE ♡" : current?.title ?? "Burrow session"}
            {isCurrentCleared && !complete ? " // CLEARED" : ""}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500"
              style={{ width: progress + "%" }}
            />
          </div>
          <p className="mt-2 text-[9px] font-black uppercase tracking-[.16em] text-on-surface-variant/60">
            {cleared} / {total} ROOMS CLEARED // {progress}%
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href="/games/chaos-run"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-secondary/35 bg-secondary/5 px-4 text-[10px] font-black uppercase tracking-[.16em] text-secondary hover:border-secondary/60 hover:bg-secondary/10 transition-colors"
          >
            VIEW RUN
          </Link>
          <Link
            href="/games"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-outline-variant/25 px-4 text-[10px] font-black uppercase tracking-[.16em] text-on-surface-variant hover:border-secondary/40 hover:text-secondary transition-colors"
          >
            CHAOS DEN
          </Link>
        </div>
      </div>
    </aside>
  );
}

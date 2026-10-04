"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHAOS_SESSION_GAMES } from "@/lib/games/chaos-session";
import {
  advanceChaosSession,
  isChaosSessionComplete,
  parseChaosSession,
  serializeChaosSession,
  type ChaosSessionState,
} from "@/lib/games/chaos-session-state";

const STORAGE_KEY = "coupleplayhub:chaos-session";

export default function ChaosRunHandoff({ currentSlug }: { currentSlug: string }) {
  const [state, setState] = useState<ChaosSessionState | null>(null);

  useEffect(() => {
    const sync = () => {
      setState(parseChaosSession(window.localStorage.getItem(STORAGE_KEY)));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("coupleplayhub:chaos-session-updated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("coupleplayhub:chaos-session-updated", sync);
    };
  }, []);

  if (!state?.startedAt || state.currentSlug !== currentSlug) return null;
  if (!state.completedSlugs.includes(currentSlug)) return null;

  const complete = isChaosSessionComplete(state, CHAOS_SESSION_GAMES.length);
  const clearedCount = state.completedSlugs.length;

  if (complete) {
    return (
      <section
        className="relative mt-8 overflow-hidden rounded-3xl border border-primary/40 bg-primary/10 p-6 text-center shadow-[0_0_80px_rgba(255,0,255,.16)] sm:p-8"
        aria-live="polite"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_49%,rgba(255,255,255,.08)_50%,transparent_51%)] [background-size:18px_18px]" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[.32em] text-primary">
            RUN COMPLETE // BURROW CLEARED ♡
          </p>
          <div className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-3xl shadow-[0_0_45px_rgba(255,0,255,.2)]">
            ♡
          </div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[.25em] text-on-surface-variant">
            {clearedCount} / {CHAOS_SESSION_GAMES.length} ROOMS CLEARED
          </p>
          <h2 className="mt-2 text-3xl font-black font-headline sm:text-5xl">
            YOU CLEARED THE CHAOS.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
            Every room in this Chaos Run is clear. The Burrow has officially run out of ideas.
          </p>
          <Link
            href="/games/chaos-run"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)] transition-transform hover:scale-[1.01]"
          >
            VIEW RUN FINALE →
          </Link>
        </div>
      </section>
    );
  }

  const next = state.nextSlug
    ? CHAOS_SESSION_GAMES.find((game) => game.slug === state.nextSlug)
    : null;

  if (!next) return null;

  function enterNextRoom() {
    const latest = parseChaosSession(window.localStorage.getItem(STORAGE_KEY));
    const queued = latest.nextSlug
      ? CHAOS_SESSION_GAMES.find((game) => game.slug === latest.nextSlug)
      : null;

    if (!queued || latest.currentSlug !== currentSlug) return;

    const nextState = advanceChaosSession(latest, queued);
    window.localStorage.setItem(STORAGE_KEY, serializeChaosSession(nextState));
    window.dispatchEvent(
      new CustomEvent("coupleplayhub:chaos-session-updated", { detail: nextState })
    );
  }

  const progress = Math.round((clearedCount / CHAOS_SESSION_GAMES.length) * 100);

  return (
    <section
      className="relative mt-8 overflow-hidden rounded-3xl border border-primary/35 bg-primary/5 p-6 text-center shadow-[0_0_70px_rgba(255,0,255,.12)] sm:p-8"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/70 shadow-[0_0_18px_rgba(255,0,255,.7)]" />
      <div className="relative">
        <p className="text-[10px] font-black uppercase tracking-[.32em] text-primary">
          ROOM CLEARED ♡
        </p>
        <div className="mx-auto mt-5 h-2 max-w-sm overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_18px_rgba(255,0,255,.65)] transition-[width] duration-700"
            style={{ width: progress + "%" }}
          />
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-on-surface-variant">
          <span>{clearedCount} / {CHAOS_SESSION_GAMES.length} CLEARED</span>
          <span aria-hidden="true">•</span>
          <span>{progress}%</span>
        </div>
        <h2 className="mt-4 text-3xl font-black font-headline sm:text-5xl">
          THE BURROW HAS ANOTHER IDEA.
        </h2>
        <p className="mt-3 text-sm text-on-surface-variant">
          Next room: <span className="font-black text-secondary">{next.title}</span>
        </p>
        <Link
          href={"/games/" + next.slug + "?session=1"}
          onClick={enterNextRoom}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)] transition-transform hover:scale-[1.01]"
        >
          ENTER NEXT ROOM →
        </Link>
      </div>
    </section>
  );
}

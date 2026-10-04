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

  if (complete) {
    return (
      <section className="mt-8 rounded-3xl border border-primary/40 bg-primary/10 p-6 sm:p-8 text-center shadow-[0_0_70px_rgba(255,0,255,.12)]" aria-live="polite">
        <p className="text-[10px] font-black uppercase tracking-[.32em] text-primary">RUN COMPLETE // BURROW CLEARED ♡</p>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black font-headline">YOU CLEARED THE CHAOS.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
          Every room in this Chaos Run is clear. The Burrow has officially run out of ideas.
        </p>
        <Link
          href="/games/chaos-run"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)]"
        >
          VIEW RUN FINALE →
        </Link>
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

  return (
    <section className="mt-8 rounded-3xl border border-primary/35 bg-primary/5 p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(255,0,255,.1)]" aria-live="polite">
      <p className="text-[10px] font-black uppercase tracking-[.32em] text-primary">ROOM CLEARED ♡</p>
      <h2 className="mt-3 text-3xl sm:text-5xl font-black font-headline">THE BURROW HAS ANOTHER IDEA.</h2>
      <p className="mt-3 text-sm text-on-surface-variant">
        Next room: <span className="font-black text-secondary">{next.title}</span>
      </p>
      <Link
        href={"/games/" + next.slug + "?session=1"}
        onClick={enterNextRoom}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)] hover:scale-[1.01] transition-transform"
      >
        ENTER NEXT ROOM →
      </Link>
    </section>
  );
}

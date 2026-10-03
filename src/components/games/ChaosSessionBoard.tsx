"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CHAOS_SESSION_GAMES, type ChaosVibe, pickSessionGame } from "@/lib/games/chaos-session";
import {
  EMPTY_CHAOS_SESSION,
  advanceChaosSession,
  completeChaosGame,
  parseChaosSession,
  serializeChaosSession,
  startChaosSession,
  type ChaosSessionState,
} from "@/lib/games/chaos-session-state";

const STORAGE_KEY = "coupleplayhub:chaos-session";

const VIBES: { id: ChaosVibe; label: string; emoji: string; copy: string }[] = [
  { id: "surprise", label: "Surprise me", emoji: "🎲", copy: "Let chaos decide." },
  { id: "cozy", label: "Cozy", emoji: "🧸", copy: "Soft, silly, low-pressure." },
  { id: "romantic", label: "Romantic", emoji: "💗", copy: "Connection first." },
  { id: "mischief", label: "Mischief", emoji: "😈", copy: "Flirty trouble." },
  { id: "chaos", label: "Maximum chaos", emoji: "⚡", copy: "Roll the dice on everything." },
];

export default function ChaosSessionBoard() {
  const [state, setState] = useState<ChaosSessionState>(EMPTY_CHAOS_SESSION);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(parseChaosSession(window.localStorage.getItem(STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, serializeChaosSession(state));
  }, [state, hydrated]);

  const vibe = state.vibe;
  const current = CHAOS_SESSION_GAMES.find((game) => game.slug === state.currentSlug) ?? null;

  function setVibe(nextVibe: ChaosVibe) {
    setState((previous) => ({ ...previous, vibe: nextVibe }));
  }

  function launch() {
    const next = pickSessionGame(CHAOS_SESSION_GAMES, vibe, current?.slug);
    setState((previous) =>
      previous.startedAt
        ? advanceChaosSession(previous, next)
        : startChaosSession(previous, next, vibe)
    );
  }

  function markCurrentComplete() {
    setState((previous) => completeChaosGame(previous));
  }

  function reset() {
    setState(EMPTY_CHAOS_SESSION);
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-primary/20 shadow-[0_0_80px_rgba(255,0,255,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-black tracking-[.3em] text-secondary uppercase">SESSION ENGINE // {String(state.roundsCompleted).padStart(2, "0")}</p>
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tight mt-2">PICK YOUR <span className="text-primary">VIBE.</span></h2>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{state.completedSlugs.length}/{CHAOS_SESSION_GAMES.length} games cleared</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {VIBES.map((item) => {
            const selected = vibe === item.id;
            const classes = selected
              ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,0,255,0.12)]"
              : "border-outline-variant/20 bg-surface-container-low hover:border-secondary/50";
            return (
              <button key={item.id} type="button" aria-pressed={selected} onClick={() => setVibe(item.id)}
                className={"text-left rounded-2xl p-4 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " + classes}>
                <span className="text-2xl">{item.emoji}</span>
                <span className="block font-black mt-3">{item.label}</span>
                <span className="block text-xs text-on-surface-variant mt-1">{item.copy}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={launch}
            className="flex-1 rounded-2xl px-6 py-4 font-black uppercase tracking-widest bg-primary text-on-primary shadow-[0_0_45px_rgba(255,0,255,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-transform">
            {current ? "NEXT CHAOS ♡" : "START SESSION ♡"}
          </button>
          {current && (
            <Link href={"/games/" + current.slug + "?session=1"}
              className="rounded-2xl px-6 py-4 font-black uppercase tracking-widest border border-secondary/40 text-secondary hover:bg-secondary/10 text-center transition-colors">
              PLAY {current.title}
            </Link>
          )}
        </div>

        {current && (
          <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-center">
            <p className="text-xs font-black tracking-[.25em] uppercase text-secondary">CHAOS HAS CHOSEN</p>
            <p className="text-2xl md:text-4xl font-black font-headline mt-2">{current.title}</p>
            <p className="text-sm text-on-surface-variant mt-2">Mark the game complete when you're done, then launch the next chaos.</p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <button type="button" onClick={markCurrentComplete}
                className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-primary/40 text-primary hover:bg-primary/10 transition-colors">
                COMPLETE GAME
              </button>
              <button type="button" onClick={reset}
                className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-outline-variant/30 text-on-surface-variant hover:border-secondary/50 transition-colors">
                RESET SESSION
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-on-surface-variant/70 mt-6">Progress stays in this browser. No account. No server-side session. No pressure. Skip anything you don't want to play.</p>
      </div>
    </div>
  );
}

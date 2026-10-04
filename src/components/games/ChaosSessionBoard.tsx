"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChaosRunTrail from "./ChaosRunTrail";
import { CHAOS_SESSION_GAMES, type ChaosVibe, pickSessionGame } from "@/lib/games/chaos-session";
import {
  EMPTY_CHAOS_SESSION,
  advanceChaosSession,
  exportChaosSession,
  importChaosSession,
  isChaosSessionComplete,
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

const CHAOS_TOTAL = CHAOS_SESSION_GAMES.length;

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

  useEffect(() => {
    function handleSessionUpdate() {
      setState(parseChaosSession(window.localStorage.getItem(STORAGE_KEY)));
    }

    window.addEventListener("coupleplayhub:chaos-session-updated", handleSessionUpdate);
    window.addEventListener("storage", handleSessionUpdate);

    return () => {
      window.removeEventListener(
        "coupleplayhub:chaos-session-updated",
        handleSessionUpdate
      );
      window.removeEventListener("storage", handleSessionUpdate);
    };
  }, []);

  const vibe = state.vibe;
  const current = CHAOS_SESSION_GAMES.find((game) => game.slug === state.currentSlug) ?? null;
  const sessionComplete = isChaosSessionComplete(state, CHAOS_SESSION_GAMES.length);

  function setVibe(nextVibe: ChaosVibe) {
    setState((previous) => ({ ...previous, vibe: nextVibe }));
  }

  function launch() {
    const restarting = sessionComplete;
    const next = pickSessionGame(
      CHAOS_SESSION_GAMES,
      vibe,
      restarting ? undefined : current?.slug,
      restarting ? [] : state.completedSlugs
    );
    setState((previous) =>
      restarting
        ? startChaosSession(previous, next, vibe)
        : previous.startedAt
          ? advanceChaosSession(previous, next)
          : startChaosSession(previous, next, vibe)
    );
  }

  function reset() {
    setState(EMPTY_CHAOS_SESSION);
  }

  function exportSession() {
    const blob = new Blob([exportChaosSession(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "coupleplayhub-chaos-session.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importSession(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imported = importChaosSession(
        typeof reader.result === "string" ? reader.result : null
      );
      setState(imported);
    };
    reader.readAsText(file);
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-5 sm:p-6 md:p-10 border border-primary/20 shadow-[0_0_80px_rgba(255,0,255,0.08)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <p className="text-[10px] font-black tracking-[.3em] text-secondary uppercase">SESSION ENGINE // {String(state.roundsCompleted).padStart(2, "0")}</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-headline tracking-tight mt-2">PICK YOUR <span className="text-primary">VIBE.</span></h2>
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

        {sessionComplete && (
          <div className="mt-6 sm:mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center shadow-[0_0_50px_rgba(255,0,255,0.12)]">
            <p className="text-xs font-black tracking-[.3em] uppercase text-primary">SESSION COMPLETE // {String(CHAOS_TOTAL).padStart(2, "0")} / {String(CHAOS_TOTAL).padStart(2, "0")}</p>
            <p className="text-3xl md:text-5xl font-black font-headline mt-2">CHAOS CLEARED ♡</p>
            <p className="text-sm text-on-surface-variant mt-2">You cleared every game in this session. Run it again whenever you want another round of trouble.</p>
          </div>
        )}

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={launch}
            className="flex-1 rounded-2xl px-6 py-4 font-black uppercase tracking-widest bg-primary text-on-primary shadow-[0_0_45px_rgba(255,0,255,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-transform">
            {sessionComplete ? "RUN IT AGAIN ♡" : current ? "NEXT CHAOS ♡" : "START SESSION ♡"}
          </button>
          {current && (
            <Link href={"/games/" + current.slug + "?session=1"}
              className="rounded-2xl px-6 py-4 font-black uppercase tracking-widest border border-secondary/40 text-secondary hover:bg-secondary/10 text-center transition-colors">
              PLAY {current.title}
            </Link>
          )}
        </div>

        {sessionComplete && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-primary/40 bg-primary/5 p-7 text-center shadow-[0_0_70px_rgba(255,0,255,.12)]">
            <p className="text-xs font-black tracking-[.32em] uppercase text-primary">RUN COMPLETE // BURROW CLEARED ♡</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black font-headline">YOU CLEARED THE CHAOS.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
              Every room in this Chaos Run has been cleared. No score. No pressure. Just one very successful night in the Burrow.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={launch}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)] hover:scale-[1.01] transition-transform"
              >
                RUN IT AGAIN ♡
              </button>
              <Link
                href="/games"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/5 px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-secondary hover:bg-secondary/10 transition-colors"
              >
                BACK TO CHAOS DEN →
              </Link>
            </div>
          </div>
        )}

        {current && state.completedSlugs.includes(current.slug) && !sessionComplete && (() => {
          const next = pickSessionGame(CHAOS_SESSION_GAMES, vibe, current.slug, state.completedSlugs);
          return (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center shadow-[0_0_45px_rgba(255,0,255,.08)]">
              <p className="text-xs font-black tracking-[.28em] uppercase text-primary">ROOM CLEARED ♡</p>
              <p className="mt-2 text-2xl sm:text-4xl font-black font-headline">THE BURROW HAS ANOTHER IDEA.</p>
              <p className="mt-2 text-sm text-on-surface-variant">Next room: <span className="font-black text-secondary">{next.title}</span></p>
              <Link
                href={"/games/" + next.slug + "?session=1"}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-[.16em] text-on-primary shadow-[0_0_35px_rgba(255,0,255,.2)] hover:scale-[1.01] transition-transform"
              >
                ENTER NEXT ROOM →
              </Link>
            </div>
          );
        })()}

        {current && (
          <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-center">
            <p className="text-xs font-black tracking-[.25em] uppercase text-secondary">CHAOS HAS CHOSEN</p>
            <p className="text-2xl md:text-4xl font-black font-headline mt-2">{current.title}</p>
            <p className="text-sm text-on-surface-variant mt-2">
              Finish a round inside the game and this session updates automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {state.completedSlugs.includes(current.slug) && (
                <span className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-primary/40 text-primary bg-primary/5">
                  ROUND CLEARED ♡
                </span>
              )}
              <button type="button" onClick={exportSession}
                className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-secondary/30 text-secondary hover:border-secondary/60 transition-colors">
                EXPORT
              </button>
              <label
                className="cursor-pointer rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-secondary/30 text-secondary hover:border-secondary/60 transition-colors"
              >
                IMPORT
                <input type="file" accept="application/json,.json" onChange={importSession} className="sr-only" />
              </label>
              <button type="button" onClick={reset}
                className="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border border-outline-variant/30 text-on-surface-variant hover:border-secondary/50 transition-colors">
                RESET SESSION
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-on-surface-variant/70 mt-6">Progress stays in this browser. No account. No server-side session. No pressure. Skip anything you don't want to play.</p>
      </div>

      <ChaosRunTrail />
    </div>
  );
}

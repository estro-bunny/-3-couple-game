"use client";

import { useState } from "react";
import Link from "next/link";
import { CHAOS_SESSION_GAMES, type ChaosVibe, pickSessionGame } from "@/lib/games/chaos-session";

const VIBES: { id: ChaosVibe; label: string; emoji: string; copy: string }[] = [
  { id: "surprise", label: "Surprise me", emoji: "🎲", copy: "Let chaos decide." },
  { id: "cozy", label: "Cozy", emoji: "🧸", copy: "Soft, silly, low-pressure." },
  { id: "romantic", label: "Romantic", emoji: "💗", copy: "Connection first." },
  { id: "mischief", label: "Mischief", emoji: "😈", copy: "Flirty trouble." },
  { id: "chaos", label: "Maximum chaos", emoji: "⚡", copy: "Roll the dice on everything." },
];

export default function ChaosSessionBoard() {
  const [vibe, setVibe] = useState<ChaosVibe>("surprise");
  const [current, setCurrent] = useState<ReturnType<typeof pickSessionGame> | null>(null);
  const [round, setRound] = useState(0);

  function launch() {
    const next = pickSessionGame(CHAOS_SESSION_GAMES, vibe, current?.slug);
    setCurrent(next);
    setRound((value) => value + 1);
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-primary/20 shadow-[0_0_80px_rgba(255,0,255,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-black tracking-[.3em] text-secondary uppercase">SESSION ENGINE // {String(round).padStart(2, "0")}</p>
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tight mt-2">PICK YOUR <span className="text-primary">VIBE.</span></h2>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{CHAOS_SESSION_GAMES.length} games connected</span>
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
            <Link href={"/games/" + current.slug}
              className="rounded-2xl px-6 py-4 font-black uppercase tracking-widest border border-secondary/40 text-secondary hover:bg-secondary/10 text-center transition-colors">
              PLAY {current.title}
            </Link>
          )}
        </div>

        {current && (
          <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-center">
            <p className="text-xs font-black tracking-[.25em] uppercase text-secondary">CHAOS HAS CHOSEN</p>
            <p className="text-2xl md:text-4xl font-black font-headline mt-2">{current.title}</p>
            <p className="text-sm text-on-surface-variant mt-2">Finish a round, come back here, and let the session pick your next game.</p>
          </div>
        )}

        <p className="text-center text-xs text-on-surface-variant/70 mt-6">No account. No server-side session. No pressure. Skip anything you don't want to play.</p>
      </div>
    </div>
  );
}

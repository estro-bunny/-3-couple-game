"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import {
  EMPTY_GAME_SESSION,
  completeGameRound,
  loadGameSession,
  resetGameSession,
  type GameSession,
} from "@/lib/games/session";
import {
  getRouletteRotation,
  pickRouletteOption,
  SEX_ROULETTE_OPTIONS,
} from "@/lib/games/roulette";

const STORAGE_KEY = "coupleplayhub:game:sex-roulette-wheel";
const SPIN_DURATION = 2200;

export default function SexRouletteBoard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);
  const [rotation, setRotation] = useState(0);
  const previousId = useRef<string | undefined>(undefined);
  const timeoutRef = useRef<number | null>(null);

  const selected = useMemo(
    () => SEX_ROULETTE_OPTIONS.find((option) => option.id === selectedId) ?? null,
    [selectedId]
  );

  useEffect(() => {
    setSession(loadGameSession(STORAGE_KEY));

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;

    const next = pickRouletteOption(
      SEX_ROULETTE_OPTIONS,
      previousId.current
    );
    if (!next) return;

    const selectedIndex = SEX_ROULETTE_OPTIONS.findIndex(
      (option) => option.id === next.id
    );

    previousId.current = next.id;
    setSelectedId(null);
    setIsSpinning(true);
    setRotation((current) =>
      getRouletteRotation(
        current,
        selectedIndex,
        SEX_ROULETTE_OPTIONS.length,
        5 + Math.floor(Math.random() * 2)
      )
    );

    timeoutRef.current = window.setTimeout(() => {
      setSelectedId(next.id);
      setIsSpinning(false);
      setSession((current) => {
        return completeGameRound(STORAGE_KEY, current);
      });
    }, SPIN_DURATION);
  }, [isSpinning]);

  const reset = useCallback(() => {
    if (isSpinning) return;
    setSelectedId(null);
  }, [isSpinning]);

  const clearProgress = useCallback(() => {
    if (isSpinning) return;

    setSelectedId(null);
    setSession(resetGameSession(STORAGE_KEY));
    previousId.current = undefined;
  }, [isSpinning]);

  const segmentSize = 100 / SEX_ROULETTE_OPTIONS.length;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 sm:space-y-8">
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Local session
          </p>
          <p className="font-bold">
            {session.roundsCompleted}{" "}
            {session.roundsCompleted === 1 ? "spin" : "spins"} played
          </p>
        </div>
        {session.roundsCompleted > 0 && (
          <button
            type="button"
            onClick={clearProgress}
            disabled={isSpinning}
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40"
          >
            Clear progress
          </button>
        )}
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-10 border border-outline-variant/20">
        <div className="relative mx-auto w-[min(78vw,420px)] aspect-square">
          <div
            className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 text-3xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            aria-hidden="true"
          >
            ▼
          </div>

          <div
            className="absolute inset-0 rounded-full border-4 border-surface shadow-[0_0_50px_rgba(255,0,255,0.18)] overflow-hidden transition-transform duration-[2200ms] ease-out will-change-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(from -22.5deg, ${SEX_ROULETTE_OPTIONS
                .map((_, index) => {
                  const start = index * segmentSize;
                  const end = (index + 1) * segmentSize;
                  return `var(--roulette-${index}) ${start}% ${end}%`;
                })
                .join(", ")})`,
            }}
          >
            {SEX_ROULETTE_OPTIONS.map((option, index) => {
              const angle = index * (360 / SEX_ROULETTE_OPTIONS.length) + 22.5;
              return (
                <div
                  key={option.id}
                  className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-145px) rotate(-${angle}deg)`,
                  }}
                >
                  <span className="block text-2xl">{option.emoji}</span>
                  <span className="block text-[10px] md:text-xs font-black leading-tight">
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute inset-[42%] z-10 rounded-full bg-surface border-4 border-outline-variant/30 shadow-xl flex items-center justify-center text-2xl">
            🐇
          </div>
        </div>

        <div className="mt-10 min-h-24 flex flex-col items-center justify-center text-center">
          {selected ? (
            <>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                Roulette chose
              </span>
              <p className="text-2xl md:text-3xl font-black font-headline tracking-tight mt-2">
                {selected.emoji} {selected.label}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black font-headline">
                {isSpinning ? "Spinning..." : "Spin the wheel"}
              </h2>
              <p className="text-on-surface-variant mt-2">
                Let chance pick the next playful moment.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          size="lg"
          className="rounded-xl min-w-[190px] shadow-[0_0_40px_rgba(255,0,255,0.3)]"
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? "SPINNING..." : selected ? "SPIN AGAIN" : "SPIN"}
        </Button>
        {selected && !isSpinning && (
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl"
            onClick={reset}
          >
            RESET
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Skip anything that does not feel right.
      </p>

      <style jsx>{`
        :global(:root) {
          --roulette-0: #ff4fa3;
          --roulette-1: #ff77c8;
          --roulette-2: #b56cff;
          --roulette-3: #7b6cff;
          --roulette-4: #5ecbff;
          --roulette-5: #52e0c4;
          --roulette-6: #d86cff;
          --roulette-7: #ff5c8a;
        }
      `}</style>
    </div>
  );
}

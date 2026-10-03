"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import {
  EMPTY_GAME_SESSION,
  completeGameRound,
  loadGameSession,
  resetGameSession,
  type GameSession,
} from "@/lib/games/session";

const KEY = "coupleplayhub:game:sexy-timer";
const DURATIONS = [30, 60, 90, 120] as const;
const PROMPTS = [
  "Give your partner a genuine compliment.",
  "Share a favorite memory together.",
  "Have a tiny dance break.",
  "Hold hands and take three slow breaths together.",
  "Let your partner choose the next song.",
  "Give your partner a warm hug.",
  "Invent a ridiculous nickname for each other.",
  "Plan a five-minute mini-date for later.",
] as const;

export default function SexyTimerBoard() {
  const [duration, setDuration] = useState<number>(60);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);

  useEffect(() => {
    setSession(loadGameSession(KEY));
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value === null || value <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setSession((prev) => completeGameRound(KEY, prev));
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const minutes = Math.floor((remaining ?? duration) / 60);
  const seconds = (remaining ?? duration) % 60;
  const timeLabel = useMemo(
    () => `${minutes}:${seconds.toString().padStart(2, "0")}`,
    [minutes, seconds]
  );

  const start = useCallback(() => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    setRemaining(duration);
    setRunning(true);
  }, [duration]);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(null);
    setPrompt(null);
  }, []);

  const clearProgress = useCallback(() => {
    setSession(resetGameSession(KEY));
    reset();
  }, [reset]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Local session</p>
          <p className="font-bold">{session.roundsCompleted} {session.roundsCompleted === 1 ? "round" : "rounds"} completed</p>
        </div>
        {session.roundsCompleted > 0 && (
          <button type="button" onClick={clearProgress} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary">
            Clear progress
          </button>
        )}
      </div>

      <div className="glass-card rounded-3xl p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">Countdown</p>
        <div className="text-7xl md:text-9xl font-black tracking-tighter my-6" aria-live="polite">
          {timeLabel}
        </div>
        <p className="min-h-7 text-lg font-bold">
          {prompt ?? "Choose a duration, then start the challenge."}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {DURATIONS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => { if (!running) setDuration(value); }}
            disabled={running}
            className={`rounded-xl px-5 py-3 font-bold border transition-colors ${duration === value ? "border-primary bg-primary/10" : "border-outline-variant/30"} disabled:opacity-50`}
          >
            {value}s
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button size="lg" className="rounded-xl min-w-[180px]" onClick={running ? reset : start}>
          {running ? "STOP" : remaining === 0 ? "PLAY AGAIN" : "START"}
        </Button>
        {remaining !== null && !running && (
          <Button variant="outline" size="lg" className="rounded-xl" onClick={reset}>RESET</Button>
        )}
      </div>

      <p className="text-center text-xs text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Stopping early is always allowed.
      </p>
    </div>
  );
}
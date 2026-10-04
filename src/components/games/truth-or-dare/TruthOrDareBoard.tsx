"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_GAME_SESSION,
  GameSession,
  completeGameRound,
  loadGameSession,
  resetGameSession,
} from "@/lib/games/session";
import { PROMPTS, Prompt, TruthOrDareMode } from "@/lib/games/truth-or-dare";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "coupleplayhub:game:truth-or-dare";

function pickPrompt(mode: TruthOrDareMode, previousId?: string): Prompt {
  const deck = PROMPTS[mode];
  const available = deck.filter((prompt) => prompt.id !== previousId);
  return available[Math.floor(Math.random() * available.length)] ?? deck[0];
}

export default function TruthOrDareBoard() {
  const [mode, setMode] = useState<TruthOrDareMode>("truth");
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);

  useEffect(() => {
    setSession(loadGameSession(STORAGE_KEY));
  }, []);

  const draw = useCallback((nextMode = mode) => {
    setMode(nextMode);
    setPrompt((previous) => pickPrompt(nextMode, previous?.id));
    setSession((previous) => {
      return completeGameRound(STORAGE_KEY, previous);
    });
  }, [mode]);

  const resetRound = useCallback(() => {
    setPrompt(null);
  }, []);

  const clearProgress = useCallback(() => {
    setSession(resetGameSession(STORAGE_KEY));
    setPrompt(null);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 sm:space-y-8">
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Local session
          </p>
          <p className="font-bold">
            {session.roundsCompleted}{" "}
            {session.roundsCompleted === 1 ? "prompt" : "prompts"} played
          </p>
        </div>
        {session.roundsCompleted > 0 && (
          <button
            type="button"
            onClick={clearProgress}
            className="min-h-11 px-3 rounded-xl text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-transparent hover:border-primary/20"
          >
            Clear progress
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          size="lg"
          variant={mode === "truth" ? "primary" : "outline"}
          className="rounded-xl"
          onClick={() => draw("truth")}
        >
          TRUTH
        </Button>
        <Button
          size="lg"
          variant={mode === "dare" ? "primary" : "outline"}
          className="rounded-xl"
          onClick={() => draw("dare")}
        >
          DARE
        </Button>
      </div>

      <div className="glass-card rounded-3xl min-h-[240px] sm:min-h-[280px] p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center border border-outline-variant/20">
        {prompt ? (
          <>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-5">
              {mode}
            </span>
            <p className="text-xl sm:text-2xl md:text-4xl font-black font-headline tracking-tight text-on-surface">
              {prompt.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <Button size="lg" className="rounded-xl" onClick={() => draw(mode)}>
                NEXT
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" onClick={resetRound}>
                RESET
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="text-5xl mb-4">💗</span>
            <h2 className="text-3xl font-black font-headline">Your turn.</h2>
            <p className="text-on-surface-variant mt-2 max-w-md">
              Pick Truth or Dare. You can skip anything that doesn't feel right.
            </p>
          </>
        )}
      </div>

      <p className="text-center text-xs text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Skipping is always allowed.
      </p>
    </div>
  );
}

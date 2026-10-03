"use client";

import { useCallback, useEffect, useState } from "react";
import {
  completeGameRound,
  loadGameSession,
  resetGameSession,
} from "@/lib/games/session";
import { PARTY_DECKS, PartyMode, pickPartyPrompt } from "@/lib/games/party-games";

const STORAGE_KEY = "coupleplayhub:game:party-games";

const MODE_LABELS: Record<PartyMode, string> = {
  quick: "Quick Fire",
  questions: "Questions",
  challenges: "Challenges",
};

export default function PartyGamesBoard() {
  const [mode, setMode] = useState<PartyMode>("quick");
  const [prompt, setPrompt] = useState(() => pickPartyPrompt(PARTY_DECKS.quick));
  const [previousId, setPreviousId] = useState<string | undefined>();
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    setRounds(loadGameSession(STORAGE_KEY).roundsCompleted);
  }, []);

  const nextPrompt = useCallback(() => {
    const next = pickPartyPrompt(PARTY_DECKS[mode], previousId);
    if (!next) return;

    const session = completeGameRound(
      STORAGE_KEY,
      loadGameSession(STORAGE_KEY)
    );
    setRounds(session.roundsCompleted);
    setPreviousId(next.id);
    setPrompt(next);
  }

  function changeMode(nextMode: PartyMode) {
    setMode(nextMode);
    setPreviousId(undefined);
    setPrompt(pickPartyPrompt(PARTY_DECKS[nextMode]));
  }

  const reset = useCallback(() => {
    resetGameSession(STORAGE_KEY);
    setRounds(0);
    setPreviousId(undefined);
    setPrompt(pickPartyPrompt(PARTY_DECKS[mode]));
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-surface-container p-2">
        {(Object.keys(MODE_LABELS) as PartyMode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeMode(item)}
            className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
              mode === item ? "bg-primary text-on-primary shadow-lg" : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {MODE_LABELS[item]}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-primary/20 bg-surface-container p-8 text-center shadow-[0_0_50px_rgba(255,0,255,0.12)]">
        <div className="text-5xl mb-4" aria-hidden="true">{prompt?.emoji ?? "🎲"}</div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">
          {MODE_LABELS[mode]}
        </p>
        <p className="text-2xl md:text-3xl font-bold leading-tight min-h-24">
          {prompt?.text ?? "Ready when you are."}
        </p>
        <button
          type="button"
          onClick={nextPrompt}
          className="mt-8 rounded-xl bg-primary px-8 py-4 font-black text-on-primary shadow-[0_0_30px_rgba(255,0,255,0.3)] transition hover:scale-[1.02]"
        >
          {rounds > 0 ? "NEXT ROUND" : "START PARTY"}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-on-surface-variant">
        <span>Rounds played: {rounds}</span>
        <button type="button" onClick={reset} className="underline underline-offset-4 hover:text-on-surface">
          Clear progress
        </button>
      </div>

      <p className="text-center text-xs text-on-surface-variant">
        Keep it mutual, comfortable, and fun. Anyone can skip a prompt.
      </p>
    </div>
  );
}

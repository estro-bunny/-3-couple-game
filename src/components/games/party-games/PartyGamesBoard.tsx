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
  }, [mode, previousId]);

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
  }, [mode]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left">
      <div className="burrow-panel rounded-2xl p-2 grid grid-cols-3 gap-2">
        {(Object.keys(MODE_LABELS) as PartyMode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeMode(item)}
            className={`rounded-xl px-3 py-3 text-sm font-black uppercase tracking-wide transition ${
              mode === item
                ? "bg-primary text-on-primary shadow-[0_0_25px_rgba(255,125,233,0.28)]"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {MODE_LABELS[item]}
          </button>
        ))}
      </div>

      <div className="burrow-panel rounded-[2rem] border border-primary/25 p-8 text-center shadow-[0_0_70px_rgba(255,125,233,0.14)]">
        <div className="text-5xl mb-4 text-primary animate-bunny-float" aria-hidden="true">
          {prompt?.emoji ?? "ᕱ⑅ᕱ"}
        </div>
        <p className="text-[9px] uppercase tracking-[0.25em] text-secondary font-black mb-3">
          {MODE_LABELS[mode]}
        </p>
        <p className="text-2xl md:text-3xl font-black font-headline leading-tight min-h-24">
          {prompt?.text ?? "Ready when you are."}
        </p>
        <button
          type="button"
          onClick={nextPrompt}
          className="mt-8 rounded-xl bg-primary px-8 py-4 font-black uppercase tracking-wide text-on-primary shadow-[0_0_30px_rgba(255,125,233,0.3)] transition hover:scale-[1.02]"
        >
          {rounds > 0 ? "NEXT ROUND" : "START PARTY"}
        </button>
      </div>

      <div className="burrow-panel rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-on-surface-variant">Rounds played: {rounds}</span>
        <button
          type="button"
          onClick={reset}
          className="font-black uppercase tracking-widest text-xs text-on-surface-variant underline underline-offset-4 hover:text-primary"
        >
          Clear progress
        </button>
      </div>

      <p className="text-center text-xs text-on-surface-variant">
        Keep it mutual, comfortable, and fun. Anyone can skip a prompt.
      </p>
    </div>
  );
}
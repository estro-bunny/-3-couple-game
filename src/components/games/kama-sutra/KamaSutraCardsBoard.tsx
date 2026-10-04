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
  KAMA_SUTRA_CARDS,
  pickKamaCard,
  type KamaCardKind,
} from "@/lib/games/kama-sutra";

const STORAGE_KEY = "coupleplayhub:game:kama-sutra-cards";
const KIND_LABELS: Record<KamaCardKind, string> = {
  question: "Question",
  challenge: "Challenge",
  connection: "Connection",
};

export default function KamaSutraCardsBoard() {
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);
  const previousId = useRef<string | undefined>(undefined);
  const timeoutRef = useRef<number | null>(null);

  const currentCard = useMemo(
    () =>
      KAMA_SUTRA_CARDS.find((card) => card.id === currentCardId) ?? null,
    [currentCardId]
  );

  useEffect(() => {
    setSession(loadGameSession(STORAGE_KEY));

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const drawCard = useCallback(() => {
    if (isDrawing) return;

    const next = pickKamaCard(KAMA_SUTRA_CARDS, previousId.current);
    if (!next) return;

    previousId.current = next.id;
    setIsDrawing(true);
    setCurrentCardId(null);

    timeoutRef.current = window.setTimeout(() => {
      setCurrentCardId(next.id);
      setIsDrawing(false);
      setSession((current) => {
        return completeGameRound(STORAGE_KEY, current);
      });
    }, 450);
  }, [isDrawing]);

  const reset = useCallback(() => {
    if (isDrawing) return;
    setCurrentCardId(null);
  }, [isDrawing]);

  const clearProgress = useCallback(() => {
    if (isDrawing) return;

    setCurrentCardId(null);
    setSession(resetGameSession(STORAGE_KEY));
    previousId.current = undefined;
  }, [isDrawing]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 sm:space-y-8">
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Local session
          </p>
          <p className="font-bold">
            {session.roundsCompleted}{" "}
            {session.roundsCompleted === 1 ? "card" : "cards"} drawn
          </p>
        </div>
        {session.roundsCompleted > 0 && (
          <button
            type="button"
            onClick={clearProgress}
            disabled={isDrawing}
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40"
          >
            Clear progress
          </button>
        )}
      </div>

      <div
        className={[
          "min-h-[430px] rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center",
          "border border-primary/20 bg-gradient-to-br from-primary/10 via-surface-container to-secondary/10",
          "shadow-[0_0_60px_rgba(255,0,255,0.12)] transition-transform duration-300",
          isDrawing ? "scale-95 opacity-70" : "scale-100 opacity-100",
        ].join(" ")}
      >
        {currentCard ? (
          <>
            <div className="text-5xl mb-5" aria-hidden="true">
              {currentCard.emoji}
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              {KIND_LABELS[currentCard.kind]}
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tight mt-3">
              {currentCard.title}
            </h2>
            <p className="text-xl text-on-surface-variant max-w-xl mt-6">
              {currentCard.prompt}
            </p>
          </>
        ) : (
          <>
            <div className="text-7xl mb-6" aria-hidden="true">
              🃏
            </div>
            <h2 className="text-4xl font-black font-headline">
              {isDrawing ? "Drawing..." : "Draw a card"}
            </h2>
            <p className="text-on-surface-variant mt-3 max-w-md">
              Explore a romantic prompt, connection challenge, or conversation starter.
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          size="lg"
          className="rounded-xl min-w-[190px] shadow-[0_0_40px_rgba(255,0,255,0.3)]"
          onClick={drawCard}
          disabled={isDrawing}
        >
          {isDrawing ? "DRAWING..." : currentCard ? "DRAW AGAIN" : "DRAW CARD"}
        </Button>
        {currentCard && !isDrawing && (
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
    </div>
  );
}

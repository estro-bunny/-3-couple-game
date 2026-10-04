"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import {
  EMPTY_GAME_SESSION,
  completeGameRound,
  loadGameSession,
  resetGameSession,
  type GameSession,
} from "@/lib/games/session";
import { pickRandom } from "@/lib/games/random";

const STORAGE_KEY = "coupleplayhub:game:spin-the-bottle";
const PLAYERS = ["Player 1", "Player 2"] as const;

export default function SpinTheBottleBoard() {
  const [players, setPlayers] = useState<[string, string]>([...PLAYERS]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);
  const [rotation, setRotation] = useState(0);
  const previousPlayer = useRef<string | undefined>(undefined);
  const spinTimer = useRef<number | null>(null);

  useEffect(() => {
    setSession(loadGameSession(STORAGE_KEY));
    return () => {
      if (spinTimer.current) window.clearTimeout(spinTimer.current);
    };
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;

    const nextPlayer = pickRandom(players, previousPlayer.current);
    if (!nextPlayer) return;

    previousPlayer.current = nextPlayer;
    setSelectedPlayer(null);
    setIsSpinning(true);

    const targetIndex = players.indexOf(nextPlayer);
    const targetAngle = targetIndex === 0 ? 0 : 180;
    const extraTurns = 4 + Math.floor(Math.random() * 3);

    setRotation((current) => current + extraTurns * 360 + targetAngle);

    spinTimer.current = window.setTimeout(() => {
      setSelectedPlayer(nextPlayer);
      setIsSpinning(false);
      setSession((current) => {
        return completeGameRound(STORAGE_KEY, current);
      });
    }, 1800);
  }, [isSpinning, players]);

  const clearProgress = useCallback(() => {
    setSession(resetGameSession(STORAGE_KEY));
    setSelectedPlayer(null);
    previousPlayer.current = undefined;
  }, []);

  const updatePlayer = (index: 0 | 1, value: string) => {
    setPlayers((current) => {
      const next: [string, string] = [...current];
      next[index] = value || PLAYERS[index];
      return next;
    });
    setSelectedPlayer(null);
    previousPlayer.current = undefined;
  };

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
            className="min-h-11 px-3 rounded-xl text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-transparent hover:border-primary/20"
          >
            Clear progress
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {players.map((player, index) => (
          <label key={index} className="text-left">
            <span className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              {"Player " + (index + 1)}
            </span>
            <input
              value={player}
              onChange={(event) => updatePlayer(index as 0 | 1, event.target.value)}
              maxLength={24}
              className="w-full min-h-12 rounded-xl border border-outline-variant/30 bg-surface-container-high/70 px-4 py-3 text-on-surface outline-none transition focus:border-primary"
              aria-label={"Player " + (index + 1) + " name"}
            />
          </label>
        ))}
      </div>

      <div className="glass-card rounded-3xl min-h-[300px] sm:min-h-[360px] p-5 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center border border-outline-variant/20 overflow-hidden">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5" />
          <div className="absolute inset-5 rounded-full border border-secondary/20" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest text-on-surface-variant">
            {players[0]}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest text-on-surface-variant">
            {players[1]}
          </div>
          <div
            className="text-6xl sm:text-7xl select-none transition-transform duration-[1800ms] ease-out will-change-transform"
            style={{ transform: "rotate(" + rotation + "deg)" }}
            aria-hidden="true"
          >
            🍾
          </div>
        </div>

        <div className="mt-6 sm:mt-8 min-h-20 flex flex-col items-center justify-center">
          {selectedPlayer ? (
            <>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                The bottle chose
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black font-headline tracking-tight mt-2">
                {selectedPlayer}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black font-headline">
                {isSpinning ? "Spinning..." : "Spin the bottle"}
              </h2>
              <p className="text-on-surface-variant mt-2">
                Take turns and let the bottle choose.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          size="lg"
          className="rounded-xl min-w-[180px] w-full sm:w-auto shadow-[0_0_40px_rgba(255,0,255,0.3)]"
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? "SPINNING..." : selectedPlayer ? "SPIN AGAIN" : "SPIN"}
        </Button>
        {selectedPlayer && !isSpinning && (
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl"
            onClick={() => setSelectedPlayer(null)}
          >
            RESET
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Either player can skip a round.
      </p>
    </div>
  );
}

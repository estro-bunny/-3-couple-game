"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EMPTY_GAME_SESSION,
  GameSession,
  loadGameSession,
  recordRound,
  saveGameSession,
} from "@/lib/games/session";

const ACTIONS = ["Kiss", "Cuddle", "Massage", "Compliment", "Dance", "Partner choice"];
const SETTINGS = ["On the couch", "By the window", "In the kitchen", "At the front door", "Under a blanket", "Your choice"];
const KEY = "coupleplayhub:game:super-sex-dice";

export default function SuperDiceBoard() {
  const [action, setAction] = useState<number | null>(null);
  const [setting, setSetting] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousAction = useRef<number | null>(null);
  const previousSetting = useRef<number | null>(null);

  useEffect(() => {
    setSession(loadGameSession(KEY));
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    timer.current = setTimeout(() => {
      let nextAction = Math.floor(Math.random() * 6);
      let nextSetting = Math.floor(Math.random() * 6);
      if (previousAction.current !== null && nextAction === previousAction.current) {
        nextAction = (nextAction + 1) % ACTIONS.length;
      }
      if (previousSetting.current !== null && nextSetting === previousSetting.current) {
        nextSetting = (nextSetting + 1) % SETTINGS.length;
      }
      previousAction.current = nextAction;
      previousSetting.current = nextSetting;
      setAction(nextAction);
      setSetting(nextSetting);
      setRolling(false);
      setSession(prev => {
        const next = recordRound(prev);
        saveGameSession(KEY, next);
        return next;
      });
    }, 900);
  }, [rolling]);

  const reset = () => {
    setAction(null);
    setSetting(null);
    setRolling(false);
    previousAction.current = null;
    previousSetting.current = null;
  };

  const clearProgress = () => {
    const next = EMPTY_GAME_SESSION;
    setSession(next);
    saveGameSession(KEY, next);
    reset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Local session</p>
          <p className="font-bold">{session.roundsCompleted} {session.roundsCompleted === 1 ? "round" : "rounds"} played</p>
        </div>
        {session.roundsCompleted > 0 && (
          <button type="button" onClick={clearProgress} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary">
            Clear progress
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[["Action", action, ACTIONS], ["Setting", setting, SETTINGS]].map(([label, value, items]) => (
          <div key={label as string} className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{label as string} die</p>
            <div className="min-h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-black">{rolling ? "?" : value === null ? "🎲" : Number(value) + 1}</div>
                <p className="mt-3 text-lg font-bold">{rolling ? "Rolling..." : value === null ? "Ready" : (items as string[])[Number(value)]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button type="button" onClick={roll} disabled={rolling} className="rounded-xl px-8 py-4 font-black bg-primary text-on-primary disabled:opacity-50">
          {rolling ? "ROLLING..." : action === null ? "ROLL THE DICE" : "ROLL AGAIN"}
        </button>
        {action !== null && !rolling && (
          <button type="button" onClick={reset} className="rounded-xl px-8 py-4 font-bold border border-outline-variant/40">RESET</button>
        )}
      </div>

      <p className="text-center text-sm text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Either partner can skip a result or reset the round.
      </p>
    </div>
  );
}

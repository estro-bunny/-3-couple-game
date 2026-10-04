"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EMPTY_GAME_SESSION,
  completeGameRound,
  loadGameSession,
  resetGameSession,
  type GameSession,
} from "@/lib/games/session";

const ACTIONS = ["Kiss", "Cuddle", "Massage", "Compliment", "Dance", "Your choice"];
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
      setSession(prev => completeGameRound(KEY, prev));
    }, 900);
  }, [rolling]);

  const reset = useCallback(() => {
    setAction(null);
    setSetting(null);
    setRolling(false);
    previousAction.current = null;
    previousSetting.current = null;
  }, []);

  const clearProgress = () => {
    setSession(resetGameSession(KEY));
    reset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 sm:space-y-8">
      <div className="burrow-panel rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[.25em] text-secondary">Burrow session</p>
          <p className="font-bold">{session.roundsCompleted} {session.roundsCompleted === 1 ? "round" : "rounds"} played</p>
        </div>
        {session.roundsCompleted > 0 && (
          <button type="button" onClick={clearProgress} className="min-h-11 px-3 rounded-xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary border border-transparent hover:border-primary/20">
            Clear progress
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {[
          ["Action", action, ACTIONS],
          ["Setting", setting, SETTINGS],
        ].map(([label, value, items]) => (
          <div key={label as string} className="burrow-panel rounded-[2rem] p-5 sm:p-6 border border-primary/20 shadow-[0_0_55px_rgba(255,125,233,0.1)]">
            <p className="text-[9px] font-black uppercase tracking-[.25em] text-secondary">{label as string} die</p>
            <div className="min-h-28 sm:min-h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-black font-headline text-primary drop-shadow-[0_0_14px_rgba(255,125,233,0.45)]">
                  {rolling ? "?" : value === null ? "ᕱ⑅ᕱ" : Number(value) + 1}
                </div>
                <p className="mt-3 text-lg font-black">{rolling ? "Rolling..." : value === null ? "Ready" : (items as string[])[Number(value)]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button type="button" onClick={roll} disabled={rolling} className="min-h-12 rounded-xl px-6 sm:px-8 py-4 font-black uppercase tracking-wide bg-primary text-on-primary shadow-[0_0_35px_rgba(255,125,233,0.3)] disabled:opacity-50 transition hover:scale-[1.02]">
          {rolling ? "ROLLING..." : action === null ? "ROLL THE DICE" : "ROLL AGAIN"}
        </button>
        {action !== null && !rolling && (
          <button type="button" onClick={reset} className="min-h-12 rounded-xl px-6 sm:px-8 py-4 font-black uppercase tracking-wide border border-outline-variant/40 hover:border-primary/40 hover:text-primary transition">RESET</button>
        )}
      </div>

      <p className="text-center text-xs sm:text-sm leading-relaxed text-on-surface-variant/70">
        Keep it mutual, comfortable, and fun. Either partner can skip a result or reset the round.
      </p>
    </div>
  );
}
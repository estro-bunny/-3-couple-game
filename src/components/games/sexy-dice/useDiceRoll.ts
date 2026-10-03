"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EMPTY_GAME_SESSION,
  GameSession,
  loadGameSession,
  recordRound,
  saveGameSession,
} from "@/lib/games/session";

const ACTIVITIES = [
  "Kiss",
  "Lick",
  "Stroke",
  "Massage",
  "Caress/Tickle",
  "Provider choice",
];

const BODY_PARTS = [
  "Lips & neck",
  "Chest",
  "Back",
  "Thighs & butt",
  "Legs",
  "Receiver choice",
];

const ROLL_DURATION = 1500;
const TICK_INTERVAL = 100;
const SESSION_STORAGE_KEY = "coupleplayhub:game:sexy-dice";

export interface DiceRollState {
  dice1: number | null;
  dice2: number | null;
  isRolling: boolean;
  activity: string | null;
  bodyPart: string | null;
  result: string | null;
  hasRolled: boolean;
}

const EMPTY_ROLL: DiceRollState = {
  dice1: null,
  dice2: null,
  isRolling: false,
  activity: null,
  bodyPart: null,
  result: null,
  hasRolled: false,
};

export function useDiceRoll() {
  const [state, setState] = useState<DiceRollState>(EMPTY_ROLL);
  const [session, setSession] = useState<GameSession>(EMPTY_GAME_SESSION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSession(loadGameSession(SESSION_STORAGE_KEY));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const roll = useCallback(() => {
    if (state.isRolling) return;

    setState((prev) => ({
      ...prev,
      isRolling: true,
      activity: null,
      bodyPart: null,
      result: null,
    }));

    intervalRef.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        dice1: Math.floor(Math.random() * 6) + 1,
        dice2: Math.floor(Math.random() * 6) + 1,
      }));
    }, TICK_INTERVAL);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const final1 = Math.floor(Math.random() * 6) + 1;
      const final2 = Math.floor(Math.random() * 6) + 1;
      const activity = ACTIVITIES[final1 - 1];
      const bodyPart = BODY_PARTS[final2 - 1];

      setState({
        dice1: final1,
        dice2: final2,
        isRolling: false,
        activity,
        bodyPart,
        result: `${activity} on ${bodyPart}`,
        hasRolled: true,
      });

      setSession((prev) => {
        const next = recordRound(prev);
        saveGameSession(SESSION_STORAGE_KEY, next);
        return next;
      });
    }, ROLL_DURATION);
  }, [state.isRolling]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setState(EMPTY_ROLL);
  }, []);

  const resetSession = useCallback(() => {
    const next = EMPTY_GAME_SESSION;
    setSession(next);
    saveGameSession(SESSION_STORAGE_KEY, next);
    setState(EMPTY_ROLL);
  }, []);

  return {
    ...state,
    roll,
    reset,
    resetSession,
    session,
    activities: ACTIVITIES,
    bodyParts: BODY_PARTS,
  };
}

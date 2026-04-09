"use client";

import { useState, useCallback, useRef } from "react";

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

export interface DiceRollState {
  dice1: number | null;
  dice2: number | null;
  isRolling: boolean;
  activity: string | null;
  bodyPart: string | null;
  result: string | null;
  hasRolled: boolean;
}

export function useDiceRoll() {
  const [state, setState] = useState<DiceRollState>({
    dice1: null,
    dice2: null,
    isRolling: false,
    activity: null,
    bodyPart: null,
    result: null,
    hasRolled: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roll = useCallback(() => {
    if (state.isRolling) return;

    setState((prev) => ({
      ...prev,
      isRolling: true,
      activity: null,
      bodyPart: null,
      result: null,
    }));

    // Animate random values during roll
    intervalRef.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        dice1: Math.floor(Math.random() * 6) + 1,
        dice2: Math.floor(Math.random() * 6) + 1,
      }));
    }, TICK_INTERVAL);

    // Settle on final values
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
    }, ROLL_DURATION);
  }, [state.isRolling]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({
      dice1: null,
      dice2: null,
      isRolling: false,
      activity: null,
      bodyPart: null,
      result: null,
      hasRolled: false,
    });
  }, []);

  return { ...state, roll, reset, activities: ACTIVITIES, bodyParts: BODY_PARTS };
}

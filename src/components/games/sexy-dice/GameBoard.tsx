"use client";

import Dice from "./Dice";
import ResultDisplay from "./ResultDisplay";
import Button from "@/components/ui/Button";
import { useDiceRoll } from "./useDiceRoll";

export default function GameBoard() {
  const {
    dice1,
    dice2,
    isRolling,
    activity,
    bodyPart,
    result,
    hasRolled,
    roll,
    reset,
    resetSession,
    session,
    activities,
    bodyParts,
  } = useDiceRoll();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-10">
      <div className="burrow-panel rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[.25em] text-secondary">
            Local session
          </p>
          <p className="mt-1 font-black uppercase tracking-wide">
            {session.roundsCompleted}{" "}
            {session.roundsCompleted === 1 ? "round" : "rounds"} played
          </p>
        </div>
        {session.roundsCompleted > 0 && (
          <button
            type="button"
            onClick={resetSession}
            className="min-h-11 px-3 rounded-xl text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border border-transparent hover:border-primary/20"
          >
            Clear progress
          </button>
        )}
      </div>

      <div className="flex justify-center items-center gap-5 sm:gap-10 md:gap-16">
        <Dice value={dice1} isRolling={isRolling} label="Action" />
        <Dice value={dice2} isRolling={isRolling} label="Body Part" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          size="lg"
          className="rounded-xl shadow-[0_0_40px_rgba(255,0,255,0.3)] min-w-[180px]"
          onClick={roll}
          disabled={isRolling}
        >
          {isRolling ? "ROLLING..." : hasRolled ? "ROLL AGAIN" : "PLAY"}
        </Button>
        {hasRolled && !isRolling && (
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl"
            onClick={reset}
          >
            RESET
          </Button>
        )}
      </div>

      <ResultDisplay
        result={result}
        activity={activity}
        bodyPart={bodyPart}
        hasRolled={hasRolled}
        isRolling={isRolling}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <ListPanel
          title="🎲 Activities"
          items={activities}
          activeIndex={dice1 && !isRolling ? dice1 - 1 : null}
          color="primary"
        />
        <ListPanel
          title="🎲 Body Parts"
          items={bodyParts}
          activeIndex={dice2 && !isRolling ? dice2 - 1 : null}
          color="secondary"
        />
      </div>

      <p className="text-center text-xs text-on-surface-variant/70">
        Play at your own pace. Either partner can skip a result or reset the
        round at any time.
      </p>
    </div>
  );
}

function ListPanel({
  title,
  items,
  activeIndex,
  color,
}: {
  title: string;
  items: string[];
  activeIndex: number | null;
  color: "primary" | "secondary";
}) {
  const activeRing =
    color === "primary"
      ? "border-primary bg-primary/10"
      : "border-secondary bg-secondary/10";

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 border border-outline-variant/20">
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <li
              key={item}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300
                ${isActive ? `${activeRing} border` : "border border-transparent"}
              `}
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold
                  ${isActive
                    ? color === "primary"
                      ? "bg-primary text-on-primary"
                      : "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-on-surface-variant"
                  }
                `}
              >
                {idx + 1}
              </span>
              <span
                className={`font-medium ${isActive ? "text-on-surface" : "text-on-surface-variant"}`}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

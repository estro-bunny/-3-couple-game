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
    activities,
    bodyParts,
  } = useDiceRoll();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      {/* Dice area */}
      <div className="flex justify-center items-center gap-10 md:gap-16">
        <Dice value={dice1} isRolling={isRolling} label="Action" />
        <Dice value={dice2} isRolling={isRolling} label="Body Part" />
      </div>

      {/* Play / Reset buttons */}
      <div className="flex justify-center gap-4">
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

      {/* Result */}
      <ResultDisplay
        result={result}
        activity={activity}
        bodyPart={bodyPart}
        hasRolled={hasRolled}
        isRolling={isRolling}
      />

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    <div className="glass-card rounded-2xl p-6 border border-outline-variant/20">
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

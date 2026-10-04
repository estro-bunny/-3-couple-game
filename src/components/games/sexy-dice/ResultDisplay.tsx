"use client";

interface ResultDisplayProps {
  result: string | null;
  activity: string | null;
  bodyPart: string | null;
  hasRolled: boolean;
  isRolling: boolean;
}

export default function ResultDisplay({
  result,
  activity,
  bodyPart,
  hasRolled,
  isRolling,
}: ResultDisplayProps) {
  if (isRolling) {
    return (
      <div className="text-center py-6">
        <p className="text-xl text-on-surface-variant animate-pulse">
          Rolling the dice...
        </p>
      </div>
    );
  }

  if (!hasRolled) return null;

  return (
    <div className="burrow-panel rounded-[2rem] border border-primary/25 bg-primary/5 px-5 py-8 sm:px-8 sm:py-10 text-center space-y-4 animate-fade-in shadow-[0_20px_70px_rgba(255,125,233,.10)]">
      <p className="text-[9px] font-black uppercase tracking-[.3em] text-secondary">
        Your task
      </p>
      <p className="text-3xl md:text-4xl font-black font-headline tracking-tight text-on-surface">
        <span className="text-primary">{activity}</span>
        <span className="text-on-surface-variant mx-2">on</span>
        <span className="text-secondary">{bodyPart}</span>
      </p>
      <p className="text-sm sm:text-base text-on-surface-variant pt-2">
        👉 {result}
      </p>
    </div>
  );
}

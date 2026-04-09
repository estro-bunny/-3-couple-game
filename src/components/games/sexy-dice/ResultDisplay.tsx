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
    <div className="text-center space-y-3 py-6 animate-fade-in">
      <p className="text-sm uppercase tracking-widest text-on-surface-variant">
        Your task
      </p>
      <p className="text-3xl md:text-4xl font-black font-headline tracking-tight text-on-surface">
        <span className="text-primary">{activity}</span>
        <span className="text-on-surface-variant mx-2">on</span>
        <span className="text-secondary">{bodyPart}</span>
      </p>
      <p className="text-lg text-on-surface-variant/70 pt-2">
        👉 {result}
      </p>
    </div>
  );
}

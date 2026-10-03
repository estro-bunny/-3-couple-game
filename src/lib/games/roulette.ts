export interface RouletteOption {
  id: string;
  label: string;
  emoji: string;
}

export const SEX_ROULETTE_OPTIONS: readonly RouletteOption[] = [
  { id: "compliment", label: "Give a sincere compliment", emoji: "💗" },
  { id: "kiss", label: "Share a sweet kiss", emoji: "💋" },
  { id: "memory", label: "Share a favorite memory", emoji: "✨" },
  { id: "cuddle", label: "Take a 10-second cuddle", emoji: "🫶" },
  { id: "music", label: "Choose the next song", emoji: "🎵" },
  { id: "challenge", label: "Pick a playful challenge", emoji: "🎲" },
  { id: "question", label: "Ask a flirty question", emoji: "💬" },
  { id: "choice", label: "Let your partner choose", emoji: "🎀" },
];

export function pickRouletteOption(
  options: readonly RouletteOption[],
  previousId?: string
): RouletteOption | undefined {
  if (options.length === 0) return undefined;

  const available =
    options.length > 1 && previousId
      ? options.filter((option) => option.id !== previousId)
      : options;

  return available[Math.floor(Math.random() * available.length)] ?? options[0];
}

export function getRouletteRotation(
  currentRotation: number,
  selectedIndex: number,
  optionCount: number,
  extraTurns = 5
): number {
  if (optionCount <= 0) return currentRotation;

  const segmentSize = 360 / optionCount;
  const targetCenter = selectedIndex * segmentSize + segmentSize / 2;
  const targetAngle = (360 - targetCenter) % 360;

  return currentRotation + extraTurns * 360 + targetAngle;
}

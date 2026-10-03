export function pickRandom<T>(items: readonly T[], previous?: T): T | undefined {
  if (items.length === 0) return undefined;

  const available =
    items.length > 1 && previous !== undefined
      ? items.filter((item) => item !== previous)
      : [...items];

  return available[Math.floor(Math.random() * available.length)] ?? items[0];
}

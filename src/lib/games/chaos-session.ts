export interface ChaosSessionGame {
  slug: string;
  title: string;
  vibe: string;
}

export const CHAOS_SESSION_GAMES: readonly ChaosSessionGame[] = [
  { slug: "truth-or-dare", title: "Truth or Dare", vibe: "connection" },
  { slug: "spin-the-bottle", title: "Spin the Bottle", vibe: "chaos" },
  { slug: "sex-roulette-wheel", title: "Sex Roulette Wheel", vibe: "flirty" },
  { slug: "kama-sutra-cards", title: "Kama Sutra Cards", vibe: "romantic" },
  { slug: "party-games", title: "Party Games", vibe: "playful" },
  { slug: "super-sex-dice", title: "Super Sex Dice", vibe: "chaos" },
  { slug: "sexy-timer", title: "Sexy Timer", vibe: "flirty" },
  { slug: "sexy-dice", title: "Sexy Dice", vibe: "chaos" },
];

export type ChaosVibe = "surprise" | "cozy" | "romantic" | "mischief" | "chaos";

export function pickSessionGame(games: readonly ChaosSessionGame[], vibe: ChaosVibe, previousSlug?: string) {
  const matching = vibe === "surprise"
    ? [...games]
    : games.filter((game) => vibe === "mischief"
      ? game.vibe === "flirty" || game.vibe === "playful"
      : game.vibe === vibe);
  const pool = matching.length > 0 ? matching : [...games];
  const available = pool.length > 1 && previousSlug ? pool.filter((game) => game.slug !== previousSlug) : pool;
  return available[Math.floor(Math.random() * available.length)] ?? pool[0] ?? games[0];
}

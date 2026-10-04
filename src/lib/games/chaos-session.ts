import { GAME_REGISTRY, type GameDefinition } from "./registry";

export type ChaosSessionGame = Pick<GameDefinition, "slug" | "title" | "vibe">;

export const CHAOS_SESSION_GAMES: readonly ChaosSessionGame[] = GAME_REGISTRY
  .filter((game) => game.playable && game.sessionEnabled)
  .map(({ slug, title, vibe }) => ({ slug, title, vibe }));

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

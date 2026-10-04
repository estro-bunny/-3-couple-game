import type { ChaosSessionGame, ChaosVibe } from "./chaos-session";

export interface ChaosSessionState {
  vibe: ChaosVibe;
  currentSlug: string | null;
  completedSlugs: string[];
  roundsCompleted: number;
  startedAt: number | null;
  lastAdvancedAt: number | null;
}

export const EMPTY_CHAOS_SESSION: ChaosSessionState = {
  vibe: "surprise",
  currentSlug: null,
  completedSlugs: [],
  roundsCompleted: 0,
  startedAt: null,
  lastAdvancedAt: null,
};

export function startChaosSession(
  state: ChaosSessionState,
  game: ChaosSessionGame,
  vibe: ChaosVibe,
  now = Date.now()
): ChaosSessionState {
  return {
    ...state,
    vibe,
    currentSlug: game.slug,
    completedSlugs: [],
    roundsCompleted: 0,
    startedAt: now,
    lastAdvancedAt: now,
  };
}

export function completeChaosGame(
  state: ChaosSessionState,
  slug = state.currentSlug,
  now = Date.now()
): ChaosSessionState {
  if (!slug) return state;

  const completedSlugs = state.completedSlugs.includes(slug)
    ? state.completedSlugs
    : [...state.completedSlugs, slug];

  return {
    ...state,
    completedSlugs,
    roundsCompleted: state.roundsCompleted + 1,
    lastAdvancedAt: now,
  };
}

export function advanceChaosSession(
  state: ChaosSessionState,
  game: ChaosSessionGame,
  now = Date.now()
): ChaosSessionState {
  return {
    ...state,
    currentSlug: game.slug,
    lastAdvancedAt: now,
  };
}

export function isChaosSessionComplete(
  state: ChaosSessionState,
  totalGames: number
): boolean {
  return totalGames > 0 && state.completedSlugs.length >= totalGames;
}

export function resetChaosSession(): ChaosSessionState {
  return EMPTY_CHAOS_SESSION;
}

export function serializeChaosSession(state: ChaosSessionState): string {
  return JSON.stringify(state);
}

export function parseChaosSession(raw: string | null | undefined): ChaosSessionState {
  if (!raw) return EMPTY_CHAOS_SESSION;

  try {
    const parsed = JSON.parse(raw) as Partial<ChaosSessionState>;
    const vibe: ChaosVibe =
      parsed.vibe === "surprise" ||
      parsed.vibe === "cozy" ||
      parsed.vibe === "romantic" ||
      parsed.vibe === "mischief" ||
      parsed.vibe === "chaos"
        ? parsed.vibe
        : "surprise";

    return {
      vibe,
      currentSlug: typeof parsed.currentSlug === "string" ? parsed.currentSlug : null,
      completedSlugs: Array.isArray(parsed.completedSlugs)
        ? parsed.completedSlugs.filter((slug): slug is string => typeof slug === "string")
        : [],
      roundsCompleted:
        typeof parsed.roundsCompleted === "number" && parsed.roundsCompleted >= 0
          ? parsed.roundsCompleted
          : 0,
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : null,
      lastAdvancedAt:
        typeof parsed.lastAdvancedAt === "number" ? parsed.lastAdvancedAt : null,
    };
  } catch {
    return EMPTY_CHAOS_SESSION;
  }
}

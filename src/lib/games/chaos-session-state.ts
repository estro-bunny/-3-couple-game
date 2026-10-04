import { CHAOS_SESSION_GAMES, pickSessionGame, type ChaosSessionGame, type ChaosVibe } from "./chaos-session";

export interface ChaosSessionState {
  vibe: ChaosVibe;
  currentSlug: string | null;
  nextSlug: string | null;
  completedSlugs: string[];
  roundsCompleted: number;
  startedAt: number | null;
  lastAdvancedAt: number | null;
}

export const EMPTY_CHAOS_SESSION: ChaosSessionState = {
  vibe: "surprise",
  currentSlug: null,
  nextSlug: null,
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
    nextSlug: null,
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

  const alreadyCompleted = state.completedSlugs.includes(slug);
  const completedSlugs = alreadyCompleted
    ? state.completedSlugs
    : [...state.completedSlugs, slug];

  const allComplete = completedSlugs.length >= CHAOS_SESSION_GAMES.length;
  const nextGame = allComplete
    ? null
    : pickSessionGame(CHAOS_SESSION_GAMES, state.vibe, slug, completedSlugs);

  return {
    ...state,
    completedSlugs,
    nextSlug: nextGame?.slug ?? null,
    roundsCompleted: alreadyCompleted ? state.roundsCompleted : state.roundsCompleted + 1,
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
    nextSlug: null,
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

export function exportChaosSession(state: ChaosSessionState): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: Date.now(),
      state,
    },
    null,
    2
  );
}

export function importChaosSession(raw: string | null | undefined): ChaosSessionState {
  if (!raw) return EMPTY_CHAOS_SESSION;

  try {
    const parsed = JSON.parse(raw) as {
      version?: unknown;
      state?: unknown;
    };

    if (parsed.version !== 1 || !parsed.state || typeof parsed.state !== "object") {
      return EMPTY_CHAOS_SESSION;
    }

    return parseChaosSession(JSON.stringify(parsed.state));
  } catch {
    return EMPTY_CHAOS_SESSION;
  }
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
      nextSlug: typeof parsed.nextSlug === "string" ? parsed.nextSlug : null,
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

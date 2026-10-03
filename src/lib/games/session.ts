import { completeChaosGame, parseChaosSession, serializeChaosSession } from "./chaos-session-state";

export interface GameSession {
  roundsCompleted: number;
  startedAt: number | null;
  lastPlayedAt: number | null;
}

export const EMPTY_GAME_SESSION: GameSession = {
  roundsCompleted: 0,
  startedAt: null,
  lastPlayedAt: null,
};

export function recordRound(session: GameSession, now = Date.now()): GameSession {
  return {
    roundsCompleted: session.roundsCompleted + 1,
    startedAt: session.startedAt ?? now,
    lastPlayedAt: now,
  };
}

export function loadGameSession(storageKey: string): GameSession {
  if (typeof window === "undefined") return EMPTY_GAME_SESSION;

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return EMPTY_GAME_SESSION;

    const parsed = JSON.parse(raw) as Partial<GameSession>;
    return {
      roundsCompleted:
        typeof parsed.roundsCompleted === "number" && parsed.roundsCompleted >= 0
          ? parsed.roundsCompleted
          : 0,
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : null,
      lastPlayedAt:
        typeof parsed.lastPlayedAt === "number" ? parsed.lastPlayedAt : null,
    };
  } catch {
    return EMPTY_GAME_SESSION;
  }
}

export function saveGameSession(storageKey: string, session: GameSession) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(session));
  } catch {
    // Local storage can be unavailable in private/restricted browser contexts.
  }
}

const CHAOS_SESSION_STORAGE_KEY = "coupleplayhub:chaos-session";

function gameSlugFromStorageKey(storageKey: string): string | null {
  const prefix = "coupleplayhub:game:";
  return storageKey.startsWith(prefix) ? storageKey.slice(prefix.length) : null;
}

function syncChaosSessionCompletion(storageKey: string, now: number) {
  if (typeof window === "undefined") return;
  if (!window.location.search.includes("session=1")) return;

  const slug = gameSlugFromStorageKey(storageKey);
  if (!slug) return;

  try {
    const raw = window.localStorage.getItem(CHAOS_SESSION_STORAGE_KEY);
    const state = parseChaosSession(raw);

    if (!state.currentSlug || state.currentSlug !== slug) return;

    const next = completeChaosGame(state, slug, now);
    window.localStorage.setItem(
      CHAOS_SESSION_STORAGE_KEY,
      serializeChaosSession(next)
    );

    window.dispatchEvent(
      new CustomEvent("coupleplayhub:chaos-session-updated", {
        detail: next,
      })
    );
  } catch {
    // Session sync is additive; game progress must still succeed if it fails.
  }
}

export function completeGameRound(
  storageKey: string,
  session: GameSession,
  now = Date.now()
): GameSession {
  const next = recordRound(session, now);
  saveGameSession(storageKey, next);
  syncChaosSessionCompletion(storageKey, now);
  return next;
}

export function resetGameSession(storageKey: string): GameSession {
  saveGameSession(storageKey, EMPTY_GAME_SESSION);
  return EMPTY_GAME_SESSION;
}

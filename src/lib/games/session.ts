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

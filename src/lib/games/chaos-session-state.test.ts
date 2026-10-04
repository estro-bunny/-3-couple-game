import { describe, expect, it } from "vitest";
import { CHAOS_SESSION_GAMES } from "./chaos-session";
import {
  EMPTY_CHAOS_SESSION,
  advanceChaosSession,
  completeChaosGame,
  parseChaosSession,
  serializeChaosSession,
  startChaosSession,
  isChaosSessionComplete,
} from "./chaos-session-state";

describe("chaos session state", () => {
  const first = CHAOS_SESSION_GAMES[0];
  const second = CHAOS_SESSION_GAMES[1];

  it("starts a fresh session with the selected game", () => {
    const state = startChaosSession(EMPTY_CHAOS_SESSION, first, "romantic", 1000);
    expect(state).toEqual({
      vibe: "romantic",
      currentSlug: first.slug,
      completedSlugs: [],
      roundsCompleted: 0,
      startedAt: 1000,
      lastAdvancedAt: 1000,
    });
  });

  it("records each game once while counting every completion", () => {
    let state = startChaosSession(EMPTY_CHAOS_SESSION, first, "surprise", 1000);
    state = completeChaosGame(state, first.slug, 2000);
    state = completeChaosGame(state, first.slug, 3000);
    state = completeChaosGame(state, second.slug, 4000);

    expect(state.completedSlugs).toEqual([first.slug, second.slug]);
    expect(state.roundsCompleted).toBe(3);
    expect(state.lastAdvancedAt).toBe(4000);
  });

  it("advances without clearing progress", () => {
    let state = startChaosSession(EMPTY_CHAOS_SESSION, first, "chaos", 1000);
    state = completeChaosGame(state, first.slug, 2000);
    state = advanceChaosSession(state, second, 3000);

    expect(state.currentSlug).toBe(second.slug);
    expect(state.completedSlugs).toEqual([first.slug]);
    expect(state.roundsCompleted).toBe(1);
  });

  it("detects a fully cleared session without requiring duplicate rounds", () => {
    let state = startChaosSession(EMPTY_CHAOS_SESSION, first, "surprise", 1000);
    state = completeChaosGame(state, first.slug, 2000);
    state = completeChaosGame(state, second.slug, 3000);

    expect(isChaosSessionComplete(state, 2)).toBe(true);
    expect(isChaosSessionComplete(state, 3)).toBe(false);
    expect(isChaosSessionComplete(state, 0)).toBe(false);
  });

  it("round-trips through serialization", () => {
    const state = startChaosSession(EMPTY_CHAOS_SESSION, first, "mischief", 1234);
    const parsed = parseChaosSession(serializeChaosSession(state));
    expect(parsed).toEqual(state);
  });

  it("falls back safely for malformed session data", () => {
    expect(parseChaosSession("{not-json")).toEqual(EMPTY_CHAOS_SESSION);
    expect(parseChaosSession(null)).toEqual(EMPTY_CHAOS_SESSION);
  });
});

import { describe, expect, it, beforeEach } from "vitest";
import {
  EMPTY_GAME_SESSION,
  loadGameSession,
  recordRound,
  saveGameSession,
} from "./session";

describe("game session engine", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts from an empty session", () => {
    expect(loadGameSession("test")).toEqual(EMPTY_GAME_SESSION);
  });

  it("records the first round with a start and last-played timestamp", () => {
    const next = recordRound(EMPTY_GAME_SESSION, 1000);

    expect(next).toEqual({
      roundsCompleted: 1,
      startedAt: 1000,
      lastPlayedAt: 1000,
    });
  });

  it("preserves the original start time across rounds", () => {
    const first = recordRound(EMPTY_GAME_SESSION, 1000);
    const second = recordRound(first, 2500);

    expect(second).toEqual({
      roundsCompleted: 2,
      startedAt: 1000,
      lastPlayedAt: 2500,
    });
  });

  it("round-trips a saved session through localStorage", () => {
    const session = {
      roundsCompleted: 4,
      startedAt: 1000,
      lastPlayedAt: 4000,
    };

    saveGameSession("test", session);

    expect(loadGameSession("test")).toEqual(session);
  });

  it("recovers safely from malformed storage", () => {
    window.localStorage.setItem("test", "{not-json");

    expect(loadGameSession("test")).toEqual(EMPTY_GAME_SESSION);
  });

  it("sanitizes invalid stored fields", () => {
    window.localStorage.setItem(
      "test",
      JSON.stringify({
        roundsCompleted: -4,
        startedAt: "yesterday",
        lastPlayedAt: null,
      })
    );

    expect(loadGameSession("test")).toEqual(EMPTY_GAME_SESSION);
  });
});

import { describe, expect, it } from "vitest";
import { CHAOS_SESSION_GAMES, pickSessionGame } from "./chaos-session";

describe("chaos session game selection", () => {
  it("skips already-cleared games when alternatives exist", () => {
    const selected = pickSessionGame(
      CHAOS_SESSION_GAMES,
      "surprise",
      undefined,
      [CHAOS_SESSION_GAMES[0].slug, CHAOS_SESSION_GAMES[1].slug]
    );

    expect([CHAOS_SESSION_GAMES[0].slug, CHAOS_SESSION_GAMES[1].slug]).not.toContain(selected.slug);
  });

  it("falls back safely when every game is excluded", () => {
    const selected = pickSessionGame(
      CHAOS_SESSION_GAMES,
      "surprise",
      undefined,
      CHAOS_SESSION_GAMES.map((game) => game.slug)
    );

    expect(CHAOS_SESSION_GAMES.map((game) => game.slug)).toContain(selected.slug);
  });
});

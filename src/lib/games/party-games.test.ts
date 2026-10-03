import { describe, expect, it } from "vitest";
import { PARTY_DECKS, pickPartyPrompt } from "./party-games";

describe("Party Games decks", () => {
  it("provides every supported mode", () => {
    expect(PARTY_DECKS.quick.length).toBeGreaterThan(0);
    expect(PARTY_DECKS.questions.length).toBeGreaterThan(0);
    expect(PARTY_DECKS.challenges.length).toBeGreaterThan(0);
  });

  it("avoids the previous prompt when alternatives exist", () => {
    const deck = PARTY_DECKS.quick;
    const result = pickPartyPrompt(deck, deck[0].id);
    expect(result?.id).not.toBe(deck[0].id);
  });

  it("returns undefined for an empty deck", () => {
    expect(pickPartyPrompt([])).toBeUndefined();
  });

  it("keeps prompt ids unique within each deck", () => {
    for (const deck of Object.values(PARTY_DECKS)) {
      const ids = deck.map((prompt) => prompt.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

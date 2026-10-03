import { describe, expect, it } from "vitest";
import { DARES, PROMPTS, TRUTHS } from "./truth-or-dare";

describe("Truth or Dare decks", () => {
  it("contains separate truth and dare decks", () => {
    expect(TRUTHS.length).toBeGreaterThan(0);
    expect(DARES.length).toBeGreaterThan(0);
    expect(PROMPTS.truth).toBe(TRUTHS);
    expect(PROMPTS.dare).toBe(DARES);
  });

  it("uses unique ids in each deck", () => {
    for (const deck of [TRUTHS, DARES]) {
      const ids = deck.map((prompt) => prompt.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("keeps every prompt non-empty", () => {
    for (const prompt of [...TRUTHS, ...DARES]) {
      expect(prompt.text.trim().length).toBeGreaterThan(0);
    }
  });
});

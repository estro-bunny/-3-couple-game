import { describe, expect, it } from "vitest";
import { KAMA_SUTRA_CARDS, pickKamaCard } from "./kama-sutra";

describe("Kama card engine", () => {
  it("contains a playable deck", () => {
    expect(KAMA_SUTRA_CARDS.length).toBeGreaterThan(0);
  });

  it("avoids the previous card when alternatives exist", () => {
    const result = pickKamaCard(KAMA_SUTRA_CARDS, KAMA_SUTRA_CARDS[0].id);
    expect(result?.id).not.toBe(KAMA_SUTRA_CARDS[0].id);
  });

  it("returns undefined for an empty deck", () => {
    expect(pickKamaCard([])).toBeUndefined();
  });

  it("returns a valid card from the deck", () => {
    const result = pickKamaCard(KAMA_SUTRA_CARDS);
    expect(KAMA_SUTRA_CARDS).toContainEqual(result);
  });
});

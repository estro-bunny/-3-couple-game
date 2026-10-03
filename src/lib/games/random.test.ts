import { describe, expect, it } from "vitest";
import { pickRandom } from "./random";

describe("pickRandom", () => {
  it("returns undefined for an empty deck", () => {
    expect(pickRandom([])).toBeUndefined();
  });

  it("returns the only item from a single-item deck", () => {
    expect(pickRandom(["only"])).toBe("only");
  });

  it("avoids the previous item when alternatives exist", () => {
    const result = pickRandom(["a", "b"], "a");
    expect(result).toBe("b");
  });

  it("returns a valid item", () => {
    const deck = ["a", "b", "c"] as const;
    expect(deck).toContain(pickRandom(deck));
  });
});

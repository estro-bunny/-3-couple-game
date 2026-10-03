import { describe, expect, it } from "vitest";
import { getRouletteRotation, pickRouletteOption, SEX_ROULETTE_OPTIONS } from "./roulette";

describe("roulette engine", () => {
  it("avoids the previous option when alternatives exist", () => {
    const result = pickRouletteOption(SEX_ROULETTE_OPTIONS, "compliment");
    expect(result?.id).not.toBe("compliment");
  });

  it("returns undefined for an empty option list", () => {
    expect(pickRouletteOption([])).toBeUndefined();
  });

  it("advances rotation by full turns plus a valid target angle", () => {
    const rotation = getRouletteRotation(0, 0, 8, 5);
    expect(rotation).toBeGreaterThanOrEqual(1800);
    expect(rotation).toBeLessThan(2160);
  });

  it("keeps rotation unchanged when there are no options", () => {
    expect(getRouletteRotation(123, 0, 0)).toBe(123);
  });
});

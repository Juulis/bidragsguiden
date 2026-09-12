import { describe, it, expect } from "vitest";
import { getPersonalizedBidrag, emptySituation } from "./personalize";

describe("getPersonalizedBidrag", () => {
  it("returns all when no answers", () => {
    const result = getPersonalizedBidrag(emptySituation);
    expect(result.length).toBeGreaterThan(0);
  });

  it("prioritizes barnbidrag when hasChildren", () => {
    const result = getPersonalizedBidrag({
      ...emptySituation,
      hasChildren: true,
    });
    expect(result[0].id).toBe("barnbidrag");
  });

  it("prioritizes student support when isStudent", () => {
    const result = getPersonalizedBidrag({
      ...emptySituation,
      isStudent: true,
    });
    expect(result.some((b) => b.id === "studiebidrag")).toBe(true);
    expect(result[0].category).toBe("student");
  });
});
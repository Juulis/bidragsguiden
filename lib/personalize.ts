import { bidrag, type Bidrag } from "./bidrag";

export type Situation = {
  hasChildren: boolean | null;
  isStudent: boolean | null;
  isBusiness: boolean | null;
  isSenior: boolean | null;
  lowIncome: boolean | null;
};

export const emptySituation: Situation = {
  hasChildren: null,
  isStudent: null,
  isBusiness: null,
  isSenior: null,
  lowIncome: null,
};

export function scoreBidrag(b: Bidrag, s: Situation): number {
  let score = 0;

  if (s.hasChildren === true && (b.category === "foralder" || b.tags.includes("barn") || b.tags.includes("familj"))) {
    score += 5;
  }
  if (s.isStudent === true && (b.category === "student" || b.tags.includes("studier"))) {
    score += 5;
  }
  if (s.isBusiness === true && (b.category === "foretag" || b.tags.includes("företag"))) {
    score += 5;
  }
  if (s.isSenior === true && (b.category === "pensionar" || b.tags.includes("pension"))) {
    score += 5;
  }
  if (s.lowIncome === true && (b.tags.includes("inkomst") || b.tags.includes("bistånd") || b.id === "bostadsbidrag" || b.id === "forsorjningsstod")) {
    score += 4;
  }

  // Mild boost for general privatperson when nothing specific matches
  if (b.category === "privatperson") score += 1;

  return score;
}

export function getPersonalizedBidrag(s: Situation): Bidrag[] {
  const hasAnyAnswer = Object.values(s).some((v) => v !== null);
  if (!hasAnyAnswer) return bidrag;

  return [...bidrag]
    .map((b) => ({ b, score: scoreBidrag(b, s) }))
    .filter((x) => x.score > 0)
    .sort((a, c) => c.score - a.score)
    .map((x) => x.b);
}
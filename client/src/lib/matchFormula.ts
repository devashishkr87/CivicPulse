import type { CandidateScores, UserPriorities, ScoreBreakdown } from '@/types';

export interface MatchResult {
  matchScore: number; // 0–100, integer (Math.round)
  breakdown: ScoreBreakdown;
}

/**
 * Calculate weighted match score between user priorities and candidate policy positions.
 *
 * Formula:
 *   weighted_sum = Σ (user_priority[i] × candidate_score[i])
 *   max_possible = Σ (user_priority[i] × 5)
 *   score        = Math.round((weighted_sum / max_possible) × 100)
 *
 * Example (AC8):
 *   user      = {economy:5, education:3, healthcare:2, environment:1}
 *   candidate = {economy:4, education:3, healthcare:4, environment:2}
 *   weighted  = (5×4)+(3×3)+(2×4)+(1×2) = 20+9+8+2 = 39
 *   max       = (5+3+2+1)×5             = 11×5      = 55
 *   score     = Math.round(39/55 × 100) = Math.round(70.909) = 71
 */
export function calculateMatch(
  priorities: UserPriorities,
  positions: CandidateScores
): MatchResult {
  const keys = ['economy', 'education', 'healthcare', 'environment'] as const;

  const weightedSum = keys.reduce((acc, k) => acc + priorities[k] * positions[k], 0);
  const maxPossible = keys.reduce((acc, k) => acc + priorities[k] * 5, 0);
  const matchScore = maxPossible === 0 ? 0 : Math.round((weightedSum / maxPossible) * 100);

  const breakdown: ScoreBreakdown = {
    economy: priorities.economy * positions.economy,
    education: priorities.education * positions.education,
    healthcare: priorities.healthcare * positions.healthcare,
    environment: priorities.environment * positions.environment,
  };

  return { matchScore, breakdown };
}

import { useMemo } from 'react';
import { calculateMatch } from '@/lib/matchFormula';
import type { CandidateScores, UserPriorities, ScoreBreakdown } from '@/types';

export interface MatchScoreResult {
  matchScore: number;
  breakdown: ScoreBreakdown;
}

export function useMatchScore(
  priorities: UserPriorities,
  positions: CandidateScores
): MatchScoreResult {
  return useMemo(() => calculateMatch(priorities, positions), [priorities, positions]);
}

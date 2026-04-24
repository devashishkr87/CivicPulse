import { describe, it, expect } from 'vitest';
import { calculateMatch } from '../../src/lib/matchFormula';

describe('matchFormula', () => {
  it('AC8: priorities {5,3,2,1} vs scores {4,3,4,2} = 71%', () => {
    const priorities = { economy: 5, education: 3, healthcare: 2, environment: 1 };
    const scores = { economy: 4, education: 3, healthcare: 4, environment: 2 };
    
    const { matchScore } = calculateMatch(priorities, scores);
    expect(matchScore).toBe(71);
  });

  it('should return 100% for perfect match', () => {
    const p = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    const s = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    expect(calculateMatch(p, s).matchScore).toBe(100);
  });
});

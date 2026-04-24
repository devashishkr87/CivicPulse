import { describe, test, expect } from 'vitest';
import { calculateMatch } from '../../src/lib/matchFormula';

describe('calculateMatch', () => {
  test('AC8: priorities {5,3,2,1} vs scores {4,3,4,2} = 71%', () => {
    const priorities = { economy: 5, education: 3, healthcare: 2, environment: 1 };
    const scores = { economy: 4, education: 3, healthcare: 4, environment: 2 };
    
    const { matchScore, breakdown } = calculateMatch(priorities, scores);
    
    expect(matchScore).toBe(71);
    expect(breakdown).toEqual({
      economy: 20,
      education: 9,
      healthcare: 8,
      environment: 2
    });
  });

  test('all fives = 100%', () => {
    const priorities = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    const scores = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    
    const { matchScore } = calculateMatch(priorities, scores);
    expect(matchScore).toBe(100);
  });

  test('all ones vs all fives = 20%', () => {
    const priorities = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    const scores = { economy: 1, education: 1, healthcare: 1, environment: 1 };
    
    const { matchScore } = calculateMatch(priorities, scores);
    expect(matchScore).toBe(20);
  });

  test('zero priorities handled gracefully', () => {
    const priorities = { economy: 0, education: 0, healthcare: 0, environment: 0 };
    const scores = { economy: 5, education: 5, healthcare: 5, environment: 5 };
    
    const { matchScore } = calculateMatch(priorities, scores);
    expect(matchScore).toBe(0);
  });
});

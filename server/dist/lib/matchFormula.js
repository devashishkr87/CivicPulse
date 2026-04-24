"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMatch = void 0;
/**
 * Calculate weighted match score between user priorities and candidate policy positions.
 *
 * Formula:
 *   weighted_sum = Σ (user_priority[i] × candidate_score[i])
 *   max_possible = Σ (user_priority[i] × 5)
 *   score        = Math.round((weighted_sum / max_possible) × 100)
 */
function calculateMatch(priorities, positions) {
    const keys = ['economy', 'education', 'healthcare', 'environment'];
    const weightedSum = keys.reduce((acc, k) => acc + priorities[k] * positions[k], 0);
    const maxPossible = keys.reduce((acc, k) => acc + priorities[k] * 5, 0);
    const matchScore = maxPossible === 0 ? 0 : Math.round((weightedSum / maxPossible) * 100);
    const breakdown = {
        economy: priorities.economy * positions.economy,
        education: priorities.education * positions.education,
        healthcare: priorities.healthcare * positions.healthcare,
        environment: priorities.environment * positions.environment,
    };
    return { matchScore, breakdown };
}
exports.calculateMatch = calculateMatch;

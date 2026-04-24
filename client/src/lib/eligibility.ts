import type { EligibilityResult } from '@/types';

export function getEligibilityResult(age: number, hasId: 'yes' | 'no'): EligibilityResult {
  if (age < 18) {
    return {
      eligible: false,
      message: 'You are not yet eligible to vote in India. You can register when you turn 18.',
    };
  }
  if (hasId === 'no') {
    return {
      eligible: true,
      message: 'You are eligible to vote. Register for your Voter ID at voters.eci.gov.in.',
    };
  }
  return {
    eligible: true,
    message: 'You are eligible and already registered. Proceed to learn more.',
  };
}

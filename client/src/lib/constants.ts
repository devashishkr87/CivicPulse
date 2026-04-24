/**
 * Shared constants: State → Constituency mapping.
 * Used in client dropdown AND server seed script.
 */
export const STATE_CONSTITUENCY_MAP: Record<string, string[]> = {
  Maharashtra: ['Mumbai North', 'Mumbai South', 'Pune', 'Nagpur'],
  Delhi: ['New Delhi', 'North East Delhi', 'Chandni Chowk'],
  'Tamil Nadu': ['Chennai Central', 'Chennai North', 'Coimbatore'],
  Karnataka: ['Bangalore North', 'Bangalore South', 'Mysore'],
  'West Bengal': ['Kolkata North', 'Kolkata South', 'Howrah'],
};

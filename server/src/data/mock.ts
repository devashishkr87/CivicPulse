import { Types } from 'mongoose';

export const MOCK_CANDIDATES = [
  {
    _id: new Types.ObjectId().toString(),
    name:           'Rajesh Kumar',
    party:          'Bharatiya Vikas Party',
    constituency:   'Mumbai North',
    state:          'Maharashtra',
    education:      'M.A. Economics',
    criminal_cases: 0,
    assets:         150,
    liabilities:    20,
    profile_image:  '',
    scores:         { economy: 4, education: 3, healthcare: 4, environment: 2 },
  },
  {
    _id: new Types.ObjectId().toString(),
    name:           'Anita Desai',
    party:          'National Progress Alliance',
    constituency:   'Mumbai North',
    state:          'Maharashtra',
    education:      'LL.B.',
    criminal_cases: 1,
    assets:         85,
    liabilities:    10,
    scores:         { economy: 3, education: 5, healthcare: 3, environment: 4 },
  },
  {
    _id: new Types.ObjectId().toString(),
    name:           'Suresh Prabhu',
    party:          'Jan Shakti Party',
    constituency:   'Mumbai North',
    state:          'Maharashtra',
    education:      'B.Tech',
    criminal_cases: 0,
    assets:         210,
    liabilities:    50,
    scores:         { economy: 5, education: 4, healthcare: 2, environment: 3 },
  },
  {
    _id: new Types.ObjectId().toString(),
    name:           'Vikram Seth',
    party:          'United Democratic Front',
    constituency:   'Mumbai South',
    state:          'Maharashtra',
    education:      'Ph.D. Sociology',
    criminal_cases: 0,
    assets:         120,
    liabilities:    15,
    scores:         { economy: 2, education: 4, healthcare: 5, environment: 5 },
  },
];

export const MOCK_MANIFESTOS = [
  {
    party: 'Bharatiya Vikas Party',
    summary: {
      economy:    'Focus on manufacturing-led growth and export promotion.',
      education:  'Free skill development centres in every district.',
      healthcare: 'Universal health insurance for families below poverty line.',
    },
  },
  {
    party: 'National Progress Alliance',
    summary: {
      economy:    'Increase farmer income support and rural employment.',
      education:  'Doubling of public school infrastructure investment.',
      healthcare: 'Expand government hospitals to tier-2 cities.',
    },
  },
  {
    party: 'Jan Shakti Party',
    summary: {
      economy:    'Reduce corporate tax to attract foreign direct investment.',
      education:  'Introduce coding curriculum from Class 6 onwards.',
      healthcare: 'Public-private partnership for affordable medicines.',
    },
  },
  {
    party: 'United Democratic Front',
    summary: {
      economy:    'Strengthen social safety nets and minimum wage laws.',
      education:  'Increase education budget to 6% of GDP.',
      healthcare: 'Abolish user fees in all government hospitals.',
    },
  },
];

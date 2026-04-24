import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CandidateModel } from '../models/Candidate';
import { CandidatePositionsModel } from '../models/CandidatePositions';
import { ManifestoModel } from '../models/Manifesto';

dotenv.config();

const mongoUri = process.env.MONGO_URI_LOCAL ?? process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('No MONGO_URI or MONGO_URI_LOCAL defined in environment');
}

const PARTIES = [
  'Bharatiya Vikas Party',
  'National Progress Alliance',
  'Jan Shakti Party',
  'United Democratic Front',
];

const MANIFESTOS = [
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

const CANDIDATES_DATA = [
  // Maharashtra / Mumbai North
  {
    name:           'Rajesh Kumar',
    party:          'Bharatiya Vikas Party',
    constituency:   'Mumbai North',
    state:          'Maharashtra',
    education:      'M.A. Economics',
    criminal_cases: 0,
    assets:         150, // ₹1.5 crore
    liabilities:    20,
    scores:         { economy: 4, education: 3, healthcare: 4, environment: 2 }, // AC8 candidate
  },
  {
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
  // Maharashtra / Mumbai South
  {
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
  {
    name:           'Priya Sharma',
    party:          'Bharatiya Vikas Party',
    constituency:   'Mumbai South',
    state:          'Maharashtra',
    education:      'M.B.A.',
    criminal_cases: 0,
    assets:         300,
    liabilities:    40,
    scores:         { economy: 5, education: 3, healthcare: 4, environment: 1 },
  },
  {
    name:           'Rahul Gupta',
    party:          'National Progress Alliance',
    constituency:   'Mumbai South',
    state:          'Maharashtra',
    education:      'B.A.',
    criminal_cases: 2,
    assets:         45,
    liabilities:    5,
    scores:         { economy: 3, education: 3, healthcare: 3, environment: 3 },
  },
  // Delhi / New Delhi
  {
    name:           'Arjun Singh',
    party:          'Jan Shakti Party',
    constituency:   'New Delhi',
    state:          'Delhi',
    education:      'Graduate',
    criminal_cases: 0,
    assets:         95,
    liabilities:    12,
    scores:         { economy: 4, education: 5, healthcare: 3, environment: 2 },
  },
  {
    name:           'Meera Bai',
    party:          'United Democratic Front',
    constituency:   'New Delhi',
    state:          'Delhi',
    education:      'M.Sc.',
    criminal_cases: 0,
    assets:         110,
    liabilities:    8,
    scores:         { economy: 3, education: 4, healthcare: 5, environment: 4 },
  },
  {
    name:           'Karan Johar',
    party:          'Bharatiya Vikas Party',
    constituency:   'New Delhi',
    state:          'Delhi',
    education:      'M.A.',
    criminal_cases: 1,
    assets:         500,
    liabilities:    100,
    scores:         { economy: 5, education: 2, healthcare: 3, environment: 1 },
  },
  // Delhi / North East Delhi
  {
    name:           'Sanjay Dutt',
    party:          'National Progress Alliance',
    constituency:   'North East Delhi',
    state:          'Delhi',
    education:      'Secondary',
    criminal_cases: 3,
    assets:         75,
    liabilities:    25,
    scores:         { economy: 2, education: 2, healthcare: 2, environment: 5 },
  },
  {
    name:           'Lata Mangeshkar',
    party:          'Jan Shakti Party',
    constituency:   'North East Delhi',
    state:          'Delhi',
    education:      'Doctorate',
    criminal_cases: 0,
    assets:         180,
    liabilities:    10,
    scores:         { economy: 4, education: 5, healthcare: 4, environment: 4 },
  },
  {
    name:           'Amitabh Bachchan',
    party:          'United Democratic Front',
    constituency:   'North East Delhi',
    state:          'Delhi',
    education:      'Graduate',
    criminal_cases: 0,
    assets:         1500,
    liabilities:    200,
    scores:         { economy: 5, education: 3, healthcare: 4, environment: 2 },
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri!);

    console.log('Dropping collections...');
    await CandidateModel.deleteMany({});
    await CandidatePositionsModel.deleteMany({});
    await ManifestoModel.deleteMany({});

    console.log('Seeding 4 manifestos...');
    await ManifestoModel.insertMany(MANIFESTOS);

    console.log('Seeding 12 candidates...');
    for (const data of CANDIDATES_DATA) {
      const { scores, ...candidateData } = data;
      const candidate = await CandidateModel.create(candidateData);
      
      await CandidatePositionsModel.create({
        candidate_id: candidate._id,
        scores,
      });
    }

    console.log(`Done. Seeded ${CANDIDATES_DATA.length} candidates, ${PARTIES.length} parties.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

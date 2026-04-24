import { Schema, model } from 'mongoose';
import type { Types } from 'mongoose';
import type { CandidateScores } from '@/types';

interface ICandidatePositions {
  candidate_id: Types.ObjectId;
  scores: CandidateScores;
}

const CandidatePositionsSchema = new Schema<ICandidatePositions>({
  candidate_id: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  scores: {
    economy:     { type: Number, required: true, min: 1, max: 5 },
    education:   { type: Number, required: true, min: 1, max: 5 },
    healthcare:  { type: Number, required: true, min: 1, max: 5 },
    environment: { type: Number, required: true, min: 1, max: 5 },
  },
});

export const CandidatePositionsModel = model<ICandidatePositions>('CandidatePositions', CandidatePositionsSchema);

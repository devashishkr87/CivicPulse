import { Schema, model } from 'mongoose';
import type { Candidate } from '@/types';

const CandidateSchema = new Schema<Candidate>({
  name:           { type: String, required: true },
  party:          { type: String, required: true },
  constituency:   { type: String, required: true },
  state:          { type: String, required: true },
  education:      { type: String, default: 'Not disclosed' },
  criminal_cases: { type: Number, default: 0, min: 0 },
  assets:         { type: Number, required: true },    // integer lakhs
  liabilities:    { type: Number, required: true },    // integer lakhs
  profile_image:  { type: String, default: '' },       // empty = use initials avatar
});

// Compound index for efficient state+constituency queries
CandidateSchema.index({ state: 1, constituency: 1 });

export const CandidateModel = model<Candidate>('Candidate', CandidateSchema);

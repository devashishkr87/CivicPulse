import { Schema, model } from 'mongoose';
import type { ManifestoSummary } from '@/types';

interface IManifesto {
  party: string;
  summary: ManifestoSummary;
}

const ManifestoSchema = new Schema<IManifesto>({
  party:   { type: String, required: true, unique: true },
  summary: {
    economy:    { type: String, required: true },
    education:  { type: String, required: true },
    healthcare: { type: String, required: true },
  },
});

ManifestoSchema.index({ party: 1 });

export const ManifestoModel = model<IManifesto>('Manifesto', ManifestoSchema);

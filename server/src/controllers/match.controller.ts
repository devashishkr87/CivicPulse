import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CandidateModel } from '@/models/Candidate';
import { CandidatePositionsModel } from '@/models/CandidatePositions';
import { ManifestoModel } from '@/models/Manifesto';
import { calculateMatch } from '@/lib/matchFormula';
import { MOCK_CANDIDATES, MOCK_MANIFESTOS } from '@/data/mock';
import type { CandidateWithScore } from '@/types';

export const postMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { state, constituency, priorities } = req.body;

    // Use DB if connected, otherwise fallback to mock
    let candidates = [];
    if (mongoose.connection.readyState === 1) {
      candidates = await CandidateModel.find({ state, constituency });
    }

    if (candidates.length === 0) {
      candidates = MOCK_CANDIDATES.filter(
        (c) => c.state === state && c.constituency === constituency
      );
    }

    // 2. For each candidate, find their positions and manifesto
    const results: CandidateWithScore[] = await Promise.all(
      candidates.map(async (c: any) => {
        let positions;
        let manifesto;

        if (mongoose.connection.readyState === 1 && c._id) {
          positions = await CandidatePositionsModel.findOne({ candidate_id: c._id });
          manifesto = await ManifestoModel.findOne({ party: c.party });
        }

        // Fallback to mock positions/manifesto
        if (!positions) {
          const mockC = MOCK_CANDIDATES.find((mc) => mc.name === c.name);
          positions = mockC ? { scores: mockC.scores } : null;
        }
        if (!manifesto) {
          manifesto = MOCK_MANIFESTOS.find((m) => m.party === c.party);
        }

        if (!positions || !manifesto) {
           throw new Error(`Missing data for candidate ${c.name}`);
        }

        const { matchScore, breakdown } = calculateMatch(priorities, positions.scores);

        const candidateObj = c.toObject ? c.toObject() : c;

        return {
          ...candidateObj,
          positions: positions.scores,
          manifesto:  manifesto.summary,
          matchScore,
          breakdown,
        } as CandidateWithScore;
      })
    );

    // 3. Sort by matchScore descending
    results.sort((a, b) => b.matchScore - a.matchScore);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

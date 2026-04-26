import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CandidateModel } from '@/models/Candidate';
import { MOCK_CANDIDATES } from '@/data/mock';

export const getCandidates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { state, constituency } = req.query;
    if (!state || !constituency) {
      return res.status(400).json({
        error: true,
        message: 'State and constituency are required',
        code: 'VALIDATION_ERROR',
      });
    }

    // Use DB if connected, otherwise fallback to mock
    let candidates: (typeof MOCK_CANDIDATES[number])[] = [];
    if (mongoose.connection.readyState === 1) {
      candidates = await CandidateModel.find({ state, constituency }).limit(4);
    }

    if (candidates.length === 0) {
      candidates = MOCK_CANDIDATES.filter(
        (c) => c.state === state && c.constituency === constituency
      );
    }

    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

import type { Request, Response, NextFunction } from 'express';
import { CandidateModel } from '@/models/Candidate';

export const getConstituencies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { state } = req.query;
    if (!state) {
      return res.status(400).json({
        error: true,
        message: 'State is required',
        code: 'VALIDATION_ERROR',
      });
    }

    const constituencies = await CandidateModel.distinct('constituency', { state });
    res.json(constituencies);
  } catch (error) {
    next(error);
  }
};

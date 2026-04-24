import type { Request, Response, NextFunction } from 'express';
import { ManifestoModel } from '@/models/Manifesto';

export const getManifesto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { party } = req.params;
    const manifesto = await ManifestoModel.findOne({ party });
    if (!manifesto) {
      return res.status(404).json({
        error: true,
        message: `Manifesto for party ${party} not found`,
        code: 'NOT_FOUND',
      });
    }
    res.json(manifesto);
  } catch (error) {
    next(error);
  }
};

import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: errors.array()[0]?.msg ?? 'Validation failed',
      code: 'VALIDATION_ERROR',
    });
  }
  next();
};

export const validateMatch = [
  body('state').isString().notEmpty(),
  body('constituency').isString().notEmpty(),
  body('priorities.economy').isInt({ min: 1, max: 5 }),
  body('priorities.education').isInt({ min: 1, max: 5 }),
  body('priorities.healthcare').isInt({ min: 1, max: 5 }),
  body('priorities.environment').isInt({ min: 1, max: 5 }),
  validateRequest,
];

export const validateAIExplain = [
  body('topic').isString().notEmpty(),
  validateRequest,
];

export const validateAIVerify = [
  body('claim').isString().isLength({ min: 10 }),
  validateRequest,
];

export const validateAIChat = [
  body('message').isString().notEmpty(),
  validateRequest,
];

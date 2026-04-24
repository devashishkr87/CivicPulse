import type { Request, Response, NextFunction } from 'express';
import { explainTopic, verifyClaim, chatReply } from '@/services/aiService';

export const postAIExplain = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic } = req.body;
    const result = await explainTopic(topic);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const postAIVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { claim } = req.body;
    const result = await verifyClaim(claim);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const postAIChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, history } = req.body;
    const result = await chatReply(message, history);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

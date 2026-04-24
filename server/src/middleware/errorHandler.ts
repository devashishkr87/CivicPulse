import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: Express error object can be anything
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: NextFunction type doesn't strictly match middleware signature in all cases
  _next: NextFunction
) => {
  console.error(err);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
  const status = (err as any).status || 500;
  res.status(status).json({
    error: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
    message: (err as any).message || 'An unexpected error occurred',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
    code: (err as any).code || 'SERVER_ERROR',
  });
};


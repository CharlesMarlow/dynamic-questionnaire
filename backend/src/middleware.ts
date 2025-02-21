import { NextFunction, Request, Response } from 'express';

export const extractUserIdFromHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['userid'] as string;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required in headers.' });
  }

  (req as any).userId = userId;
  next();
};

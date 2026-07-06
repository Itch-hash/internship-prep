import type { Request, Response, NextFunction } from "express";

export const notFound = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404);

  const error = new Error(`Oops, you hit a roadblack - ${req.originalUrl} `);

  next(error);
};

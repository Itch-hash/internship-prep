import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

export const validateObjectId = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Task ID");
  }
  next();
};

import expressAsyncHandler from "express-async-handler";
import type { NextFunction, Request, Response } from "express";
import { Status } from "../types/todo.types.js";

export const sanitizeBody = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, status, hidden } = req.body;

    if (name === undefined && status === undefined && hidden === undefined) {
      res.status(400);
      throw new Error("Fields can not be empty");
    }

    if (name !== undefined && typeof name !== "string") {
      res.status(400);
      throw new Error("Name must be a string");
    }

    if (hidden !== undefined && typeof hidden !== "boolean") {
      res.status(400);
      throw new Error("Hidden must be a boolean value");
    }

    if (name !== undefined && !name.trim()) {
      res.status(400);
      throw new Error("Name cannot be empty.");
    }

    if (status !== undefined && !Object.values(Status).includes(status)) {
      res.status(400);
      throw new Error(
        `Invalid status, status must be one of the following - Allowed Statuses: ${Object.values(Status)}`,
      );
    }
    next();
  },
);

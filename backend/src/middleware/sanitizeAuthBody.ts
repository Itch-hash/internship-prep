import type { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const sanitizeAuthBody = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const missingFields = [];

    if (username === undefined) missingFields.push("username");
    if (email === undefined) missingFields.push("email");
    if (password === undefined) missingFields.push("password");

    if (missingFields.length) {
      res.status(400);
      throw new Error(`Missing required field(s): ${missingFields.join(", ")}`);
    }
    if (!username || typeof username !== "string" || !username.trim()) {
      res.status(400);
      throw new Error("Username is required.");
    }

    if (username.trim().length < 5 || username.trim().length > 20) {
      res.status(400);
      throw new Error("Username must be between 5 and 20 characters.");
    }

    if (!email || typeof email !== "string") {
      res.status(400);
      throw new Error("Email is required.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400);
      throw new Error("Please provide a valid email.");
    }

    if (!password || typeof password !== "string") {
      res.status(400);
      throw new Error("Password is required.");
    }

    if (password.length < 8 || password.length > 20) {
      res.status(400);
      throw new Error("Password must be between 8 to 20 characters.");
    }

    next();
  },
);

export default sanitizeAuthBody;

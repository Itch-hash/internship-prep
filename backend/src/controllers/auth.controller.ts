import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { IUser, SignInUserBody } from "../types/user.types.js";
import User from "../models/user.model.js";
import { JWT_EXPIRY, JWT_SECRET } from "../config/dotenv.js";
import type { StringValue } from "ms";

export const signUp = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("E-mail is already registered.");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await User.create(
      [{ username, email, password: hashedPassword }],
      { session },
    );

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }
    if (!JWT_EXPIRY) {
      throw new Error("JWT_EXPIRY is not defined in .env");
    }
    const token = jwt.sign({ userId: newUser!._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY as StringValue,
    });

    await session.commitTransaction();

    res.status(201).json({ token, newUser });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (
  req: Request<{}, {}, SignInUserBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404);
      throw new Error("User with this e-mail doesn't exist.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401);
      throw new Error("Incorrect Password.");
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }
    if (!JWT_EXPIRY) {
      throw new Error("JWT_EXPIRY is not defined in .env");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY as StringValue,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

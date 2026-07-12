import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import type { StringValue } from "ms";
import User from "../models/user.model.js";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const decoded = jwt.verify(token, JWT_SECRET as StringValue);
    if (typeof decoded === "string") {
      res.status(401);
      throw new Error("Invalid Token");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};

export default authorize;

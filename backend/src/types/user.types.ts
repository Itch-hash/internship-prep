import type { HydratedDocument } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export type UserDocument = HydratedDocument<IUser>;

export interface SignInUserBody {
  email: string;
  password: string;
}

export interface SignUpUserBody {
  username: string;
  email: string;
  password: string;
}

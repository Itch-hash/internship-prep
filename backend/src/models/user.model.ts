import mongoose from "mongoose";
import type { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "E-mail is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "E-mail must be valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const { password, ...user } = ret;
    return user;
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;

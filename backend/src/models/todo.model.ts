import mongoose from "mongoose";
import { type ITodo, Status } from "../types/todo.types.js";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    name: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Todo,
    },
    hidden: { type: Boolean, default: false },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;

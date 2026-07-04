import { type Request, type Response } from "express";
import Todo from "../models/todo.js";
import {
  type CreateTodoBody,
  Status,
  type UpdateTodoBody,
} from "../types/todo.types.js";
import expressAsyncHandler from "express-async-handler";

export const getTodos = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
  },
);

export const getTodo = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const foundTodo = await Todo.findById(id);
    if (!foundTodo) {
      res.status(404);
      throw new Error("No Task Found");
    }

    res.status(200).json(foundTodo);
  },
);

export const deleteTodo = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const findTodobyID = await Todo.findByIdAndDelete(id);
    if (!findTodobyID) {
      res.status(404);
      throw new Error("Task not found!");
    }

    res.status(200).json({ message: "Task deleted sucessfully" });
  },
);

export const createTodo = expressAsyncHandler(
  async (req: Request<{}, {}, CreateTodoBody>, res: Response) => {
    const { name, status, hidden } = req.body;

    const todo = await Todo.create({
      name,
      status: status ?? Status.Todo,
      hidden: hidden ?? false,
    });
    res.status(201).json(todo);
  },
);

export const updateTodo = expressAsyncHandler(
  async (req: Request<{ id: string }, {}, UpdateTodoBody>, res: Response) => {
    const { id } = req.params;
    const { name, status, hidden } = req.body;

    const updateData: UpdateTodoBody = {};

    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;
    if (hidden !== undefined) updateData.hidden = hidden;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      runValidators: true,
      returnDocument: "after",
    });

    if (!updatedTodo) {
      res.status(404);
      throw new Error("Task not found, Try refreshing the page!");
    }

    res.status(200).json(updatedTodo);
  },
);

import { type Request, type Response } from "express";
import Todo from "../models/todo.js";
import {
  type CreateTodoBody,
  type ITodo,
  Status,
  type TodoQuery,
  type UpdateTodoBody,
} from "../types/todo.types.js";
import expressAsyncHandler from "express-async-handler";
import { type QueryFilter } from "mongoose";

export const getTodos = expressAsyncHandler(
  async (req: Request<{}, {}, {}, TodoQuery>, res: Response) => {
    const { status, hidden, name } = req.query;
    let limit = Number(req.query.limit) || 10;

    let page = Number(req.query.page) || 1;

    const filter: QueryFilter<ITodo> = {};
    if (status) {
      filter.status = status;
    }
    if (hidden === "true") {
      filter.hidden = true;
    }

    if (hidden === "false") {
      filter.hidden = false;
    }
    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    ///
    if (limit > 100) {
      limit = 100;
    }
    if (limit < 1) {
      limit = 1;
    }
    const total = await Todo.countDocuments(filter);
    const pages = Math.ceil(total / limit);
    if (pages > 0 && page > pages) {
      page = pages;
    }
    const skip = (page - 1) * limit;
    const todos = await Todo.find(filter).skip(skip).limit(limit);
    const isEmpty = total === 0;
    const firstPage = page === 1;
    const lastPage = pages === 0 || page === pages;
    ///
    res.status(200).json({
      data: todos,
      total,
      pages,
      page,
      limit,
      isEmpty,
      firstPage,
      lastPage,
    });
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

    const foundTodo = await Todo.findByIdAndDelete(id);
    if (!foundTodo) {
      res.status(404);
      throw new Error("Task not found!");
    }

    res.status(200).json({ message: "Task deleted sucessfully" });
  },
);

export const createTodo = expressAsyncHandler(
  async (req: Request<{}, {}, CreateTodoBody>, res: Response) => {
    const { name, status, hidden } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      res.status(400);
      throw new Error("Name is required");
    }

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

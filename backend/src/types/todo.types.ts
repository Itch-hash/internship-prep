import type mongoose from "mongoose";

export enum Status {
  Todo = "To do",
  InProgress = "In-Progress",
  Done = "Done",
}
export interface ITodo {
  name: string;
  status: Status;
  hidden: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  user: mongoose.Types.ObjectId;
}
export interface CreateTodoBody {
  name: string;
  status?: Status;
  hidden?: boolean;
}

export interface UpdateTodoBody {
  name?: string;
  status?: Status;
  hidden?: boolean;
}

export interface TodoQuery {
  name?: string;
  status?: Status;
  hidden?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

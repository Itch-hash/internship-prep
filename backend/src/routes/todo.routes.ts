import { Router } from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodo,
} from "../controllers/todo.controller.js";
import { validateObjectId } from "../middleware/validateObjectId.js";
import { sanitizeBody } from "../middleware/sanitizeBody.js";

const todorouter = Router();

todorouter.get("/", getTodos);
todorouter.get("/:id", validateObjectId, getTodo);
todorouter.post("/", sanitizeBody, createTodo);

todorouter.delete("/:id", validateObjectId, deleteTodo);

todorouter.patch("/:id", validateObjectId, sanitizeBody, updateTodo);

export default todorouter;

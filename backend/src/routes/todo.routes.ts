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

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of todos per page
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - To do
 *             - In-Progress
 *             - Done
 *       - in: query
 *         name: hidden
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Search todos by name
 *     responses:
 *       200:
 *         description: List of todos
 */
todorouter.get("/", getTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by id
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
todorouter.get("/:id", validateObjectId, getTodo);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Learn TypeScript
 *               status:
 *                 type: string
 *                 example: To do
 *               hidden:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Todo created
 */
todorouter.post("/", sanitizeBody, createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted
 *       404:
 *         description: Todo not found
 */

todorouter.delete("/:id", validateObjectId, deleteTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               hidden:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated
 *       404:
 *         description: Todo not found
 */
todorouter.patch("/:id", validateObjectId, sanitizeBody, updateTodo);

export default todorouter;

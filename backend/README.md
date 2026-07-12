# Backend

Express + TypeScript backend for the Todo app. It provides JWT-based authentication, protected todo CRUD endpoints, MongoDB persistence with Mongoose, request validation middleware, rate limiting, and Swagger docs.

## Features

- User sign up and sign in with hashed passwords using `bcryptjs`
- JWT authentication for protected routes
- Todo CRUD scoped to the authenticated user
- Request sanitization and ObjectId validation middleware
- MongoDB integration with Mongoose
- Global rate limiting with `express-rate-limit`
- Swagger UI for API documentation

## Tech Stack

- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- JWT
- Swagger

## Scripts

From the `backend` directory:

```bash
npm install
npm run dev
```

Available scripts:

- `npm run dev` starts the server with `tsx watch`
- `npm run build` compiles TypeScript to `dist`
- `npm start` runs the compiled server from `dist/server.js`

## Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
DB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
```

## API Base Paths

- Auth: `/api/auth`
- Users: `/api/user`
- Todos: `/api/todos`
- Swagger docs: `/api-doc`

## Current Endpoints

### Auth

- `POST /api/auth/signup` creates a user and returns a JWT
- `POST /api/auth/signin` signs in a user and returns a JWT

### Todos

All todo routes require:

```http
Authorization: Bearer <token>
```

- `GET /api/todos` list the authenticated user’s todos
- `GET /api/todos/:id` get one todo owned by the authenticated user
- `POST /api/todos` create a todo for the authenticated user
- `PATCH /api/todos/:id` update a todo owned by the authenticated user
- `DELETE /api/todos/:id` delete a todo owned by the authenticated user

Supported query params on `GET /api/todos`:

- `page`
- `limit`
- `status`
- `hidden`
- `name`

## Example Request

```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
```

## Project Structure

```text
backend/
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/
    ├── config/
    │   ├── db.ts
    │   ├── dotenv.ts
    │   ├── limiter.ts
    │   └── swagger.ts
    ├── controllers/
    │   ├── auth.controller.ts
    │   └── todo.controller.ts
    ├── docs/
    │   └── todo.schema.ts
    ├── middleware/
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   ├── notFound.middleware.ts
    │   ├── sanitizeAuthBody.ts
    │   ├── sanitizeTodoBody.ts
    │   └── validateObjectId.ts
    ├── models/
    │   ├── todo.model.ts
    │   └── user.model.ts
    ├── routes/
    │   ├── auth.routes.ts
    │   ├── todo.routes.ts
    │   └── user.routes.ts
    ├── types/
    │   ├── express/
    │   │   └── index.d.ts
    │   ├── todo.types.ts
    │   └── user.types.ts
    └── server.ts
```

## Notes

- Rate limiting is enabled globally.
- Todo ownership is enforced in the controller layer using `req.user`.
- `user.routes.ts` exists but is currently only scaffolded.
- Swagger is served from `/api-doc`.

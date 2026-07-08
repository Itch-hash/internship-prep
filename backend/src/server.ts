import express from "express";
import todorouter from "./routes/todo.routes.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { NODE_ENV, PORT } from "./config/dotenv.js";

const app = express();

app.use(express.json());

app.use("/api/todos", todorouter);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server started on http://localhost:${PORT} in ${NODE_ENV} env`,
      );
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import sanitizeAuthBody from "../middleware/sanitizeAuthBody.js";

const authRouter = Router();

authRouter.post("/signup", sanitizeAuthBody, signUp);
authRouter.post("/signin", signIn);

export default authRouter;

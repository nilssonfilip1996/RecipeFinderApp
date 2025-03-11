import { Router } from "express";
import recipeRouter from "./recipeRoutes.js";
import authRouter from "./authRoutes.js";
import usersRouter from "./users.js"

/* 
    Gateway router that we use in app.
*/
const router = Router();

router.use(recipeRouter);
router.use(authRouter);
router.use(usersRouter);

export default router;


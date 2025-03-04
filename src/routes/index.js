import { Router } from "express";
import recipeRouter from "./recipeRoutes.js";
import authRouter from "./authRoutes.js";

/* 
    Gateway router that we use in app.
*/
const router = Router();

router.use(recipeRouter);
router.use(authRouter);

export default router;


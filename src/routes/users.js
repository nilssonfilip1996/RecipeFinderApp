import { Router } from "express";
import passport from "passport";
import db from "../db/index.js";

import {getUsersRecipes, addRecipe} from "../db/index.js"

const router = Router();

router.get("/users/addRecipe", (req, res) => {
    const recipeId = req.session.currentState.chosenRecipe.id;
    const userId = req.user.id;
    const title = req.session.currentState.chosenRecipe.title;
    const imgUrl = req.session.currentState.chosenRecipe.image;
    addRecipe(recipeId, userId, title, imgUrl)
    res.redirect("/");
});

export default router;
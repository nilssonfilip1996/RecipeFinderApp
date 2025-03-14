import { Router } from "express";
import * as dbHandler from "../db/index.js";

const router = Router();

router.get("/users/addRecipe", (req, res) => {
    if(!req.isAuthenticated()){
        return res.redirect("/");
    }
    const recipeId = req.session.currentState.chosenRecipe.id;
    const userId = req.user.id;
    const title = req.session.currentState.chosenRecipe.title;
    const imgUrl = req.session.currentState.chosenRecipe.image;
    dbHandler.addRecipe(recipeId, userId, title, imgUrl);
    res.redirect(`/recipe/view/${recipeId}`);
});

router.get("/users/removeRecipe", (req, res) => {
    if(!req.isAuthenticated()){
        return res.redirect("/");
    }
    const recipeId = req.session.currentState.chosenRecipe.id;
    const userId = req.user.id;
    dbHandler.removeRecipe(recipeId, userId);
    res.redirect(`/recipe/view/${recipeId}`);
});

/* router.get("/users/viewAllRecipes", (req, res) => {
    //TODO when user clicks on "My saved recipes" in the navbar menu.
    if(!req.isAuthenticated()){
        return res.redirect("/");
    }
    const userId = req.user.id;
    const recipes = dbHandler.getUsersRecipes(userId);
    res.render("/")
}); */

router.get("/users/viewRecipe", (req, res) => {
    //TODO when user clicks on one of it's bookmarked recipes.
});

export default router;
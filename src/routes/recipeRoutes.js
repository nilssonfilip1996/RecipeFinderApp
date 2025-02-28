import { Router } from "express";
import { searchForRecipes, getRecipe } from "../utils/spoonacularHandler.js"
import { PROTEIN_LIST, COUSINE_LIST} from "../../public/constants/searchParameters.js";

const router = Router();

/* Default route. */
router.get("/", (req, res) => {
    if(req.isAuthenticated()){
        console.log(`${req.user.username} is online.`);
    }
    
    /* Remember what the user enters so sumbsequent requests can auto-fill forms etc. */
    req.session.searchParams = {
        "cousine":"",
        "protein":"",
        "chosenRecipe":{},
        "searchResults":[]
    };
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, localSession: req.session.searchParams});
});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
router.post("/recipeSearch", async (req, res) => {
    try {
        var recipeList = await searchForRecipes(req.body.selectedCousine, req.body.selectedProtein, 9);

        req.session.searchParams.cousine = req.body.selectedCousine;
        req.session.searchParams.protein = req.body.selectedProtein;
        req.session.searchParams.searchResults = recipeList.data.results;

        var displayError = null;
        if(req.session.searchParams.searchResults<1){
            displayError = "No recipes found."
        }
        res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, localSession: req.session.searchParams, error: displayError, scrollToResults: true});
    } catch (error) {
        console.log(JSON.stringify(error.response.data));
        res.render("index.ejs", {error: error.response.data.message});
    }
});

/* Post-request. Called when the user wants to view a specific recipe based on it's id.*/
router.post("/viewRecipe/:id", async (req, res) => {
    try {
        var recipe = await getRecipe(req.params.id);
        req.session.searchParams.chosenRecipe = recipe.data;
        res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, localSession: req.session.searchParams, recipe: recipe.data});
    } catch (error) {
        const stringifiedError = JSON.stringify(error.response.data);
        console.log(stringifiedError);
        res.render("index.ejs", {error: error.response.data.message});
    }
});

export default router;
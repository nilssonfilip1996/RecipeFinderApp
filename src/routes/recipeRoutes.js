import { Router } from "express";
import { searchForRecipes, getRecipe } from "../utils/spoonacularHandler.js"
import { PROTEIN_LIST, COUSINE_LIST} from "../../public/constants/searchParameters.js";

const router = Router();

let userSearch = {
    "cousine":"",
    "protein":"",
    "chosenRecipe":{},
    "searchResults":[]
}

/* Default route. */
router.get("/", (req, res) => {
    if(req.isAuthenticated()){
        console.log(`${req.user.username} is online.`);
    }
    userSearch = {
        "cousine":"",
        "protein":"",
        "chosenRecipe":{},
        "searchResults":[]
    }
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});
});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
router.post("/recipeSearch", async (req, res) => {
    //console.log(req.body);
    try {
        var recipeList = await searchForRecipes(req.body.selectedCousine, req.body.selectedProtein, 9);
        userSearch.cousine = req.body.selectedCousine;
        userSearch.protein = req.body.selectedProtein;
        userSearch.searchResults = recipeList.data.results;
        //console.log(req.body);
        var displayError = null;
        if(userSearch.searchResults<1){
            displayError = "No recipes found."
        }
        res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch, error: displayError, scrollToResults: true});
    } catch (error) {
        console.log(JSON.stringify(error.response.data));
        res.render("index.ejs", {error: error.response.data.message});
    }
});

/* Post-request. Called when the user wants to view a specific recipe based on it's id.*/
router.post("/viewRecipe/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        var recipe = await getRecipe(req.params.id);
        userSearch.chosenRecipe = recipe.data;
        res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch, recipe: recipe.data});
    } catch (error) {
        const stringifiedError = JSON.stringify(error.response.data);
        console.log(stringifiedError);
        res.render("index.ejs", {error: error.response.data.message});
    }
});

export default router;
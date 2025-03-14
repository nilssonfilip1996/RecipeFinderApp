import { Router } from "express";
import * as spoonacularHandler from "../utils/spoonacularHandler.js"
import { DROPDOWNVALUES} from "../../public/constants/searchParameters.js";
import * as dbHandler from "../db/index.js";

const router = Router();

/* Default route. */
router.get("/", (req, res) => {
/*   if (req.isAuthenticated()) {
    console.log(`${req.user.username} is online.`);
  } */
  /* console.log("");
  console.log(req.session);
  console.log(""); */

  /* Remember what the user enters so subsequent requests can auto-fill forms etc. */
  req.session.currentState = {
    selectedSearchParams: {cousine: "",protein: ""},
    chosenRecipe: {},
    searchResults: [],
  };
  res.render("index.ejs", {
    dropDownValues: DROPDOWNVALUES,
    selectedSearchParams: req.session.currentState.selectedSearchParams,
    user: req.session.passport ? req.session.passport.user : null,
  });
});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
router.post("/recipe/search", async (req, res) => {
  try {
    var recipeList = await spoonacularHandler.searchForRecipes(
      req.body.selectedCousine,
      req.body.selectedProtein,
      9
    );

    req.session.currentState.selectedSearchParams.cousine = req.body.selectedCousine;
    req.session.currentState.selectedSearchParams.protein = req.body.selectedProtein;
    req.session.currentState.searchResults = recipeList.data.results;

    var displayError = null;
    if (req.session.currentState.searchResults < 1) {
      displayError = "No recipes found.";
    }
    res.render("index.ejs", {
      dropDownValues: DROPDOWNVALUES,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
      error: displayError,
      scrollToResults: true,
      user: req.session.passport ? req.session.passport.user : null,
    });
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { error: error.response.data.message, user: req.session.passport ? req.session.passport.user : null });
  }
});

/* Post-request. Called when the user wants to view a specific recipe based on it's id.*/
router.get("/recipe/view/:id", async (req, res) => {
  try {
    console.log("Inside /recipe/view/:id " + req.params.id);
    var recipeId = req.params.id;
    var recipe = await spoonacularHandler.getRecipe(recipeId);
    req.session.currentState.chosenRecipe = recipe.data;
    
    let isFavorit = null;
    if(req.isAuthenticated()){
      isFavorit = await dbHandler.checkIfRecipeIsFavorit(req.user.id, recipeId);
    }
    
    res.render("index.ejs", {
      dropDownValues: DROPDOWNVALUES,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
      user: req.isAuthenticated() ? req.session.passport.user : null,
      isChosenRecipeFavorite: isFavorit,
    });
  } catch (error) {
    const stringifiedError = JSON.stringify(error.response.data);
    console.log(stringifiedError);
    res.render("index.ejs", { error: error.response.data.message, user: req.session.passport ? req.session.passport.user : null, });
  }
});

//router.get("/recipe/view", )

export default router;

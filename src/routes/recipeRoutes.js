import { Router } from "express";
import { searchForRecipes, getRecipe } from "../utils/spoonacularHandler.js";
import {
  PROTEIN_LIST,
  COUSINE_LIST,
} from "../../public/constants/searchParameters.js";

const dropDownValues = { proteins: PROTEIN_LIST, cousines: COUSINE_LIST };
const router = Router();

/* Default route. */
router.get("/", (req, res) => {
/*   if (req.isAuthenticated()) {
    console.log(`${req.user.username} is online.`);
  } */

  /* Remember what the user enters so subsequent requests can auto-fill forms etc. */
  req.session.currentState = {
    selectedSearchParams: {cousine: "",protein: ""},
    chosenRecipe: {},
    searchResults: [],
  };
  res.render("index.ejs", {
    dropDownValues: dropDownValues,
    selectedSearchParams: req.session.currentState.selectedSearchParams,
    currentState: req.session.currentState,
  });
});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
router.post("/recipe/search", async (req, res) => {
  try {
    var recipeList = await searchForRecipes(
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
      dropDownValues: dropDownValues,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
      error: displayError,
      scrollToResults: true,
    });
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { error: error.response.data.message });
  }
});

/* Post-request. Called when the user wants to view a specific recipe based on it's id.*/
router.post("/recipe/view/:id", async (req, res) => {
  try {
    var recipe = await getRecipe(req.params.id);
    req.session.currentState.chosenRecipe = recipe.data;
    
    res.render("index.ejs", {
      dropDownValues: dropDownValues,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
    });
  } catch (error) {
    const stringifiedError = JSON.stringify(error.response.data);
    console.log(stringifiedError);
    res.render("index.ejs", { error: error.response.data.message });
  }
});

export default router;

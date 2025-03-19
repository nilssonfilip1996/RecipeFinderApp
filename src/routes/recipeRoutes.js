import { Router } from "express";
import * as spoonacularHandler from "../utils/spoonacularHandler.js";
import { DROPDOWNVALUES } from "../../public/constants/searchParameters.js";
import * as dbHandler from "../db/index.js";

const router = Router();

/* Default route. */
router.get("/", (req, res) => {
  /* Custom data that is stored in a users session. */
  req.session.currentState = {
    selectedSearchParams: { cousine: "", protein: "" },
    showingBookmarked: "off",
    chosenRecipe: {},
    searchResults: [],
  };
  res.render("index.ejs", {
    dropDownValues: DROPDOWNVALUES,
    selectedSearchParams: req.session.currentState.selectedSearchParams,
    showingBookmarked: req.session.showingBookmarked,
    user: req.session.passport ? req.session.passport.user : null,
  });
});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
router.post("/recipe/search", async (req, res) => {
  try {
    if (req.body["showBookmarkedOnly"] === "on") {
      const userId = req.session.passport.user.id;
      var recipeList = await dbHandler.getUsersRecipes(userId);
      req.session.currentState.searchResults = recipeList;
      req.session.currentState.showingBookmarked = "on";
    } else {
      var recipeList = await spoonacularHandler.searchForRecipes(
        req.body.selectedCousine,
        req.body.selectedProtein,
        9
      );
      req.session.currentState.searchResults = recipeList.data.results;
      req.session.currentState.showingBookmarked = "off";
    }

    req.session.currentState.selectedSearchParams.cousine =
      req.body.selectedCousine;
    req.session.currentState.selectedSearchParams.protein =
      req.body.selectedProtein;

    //console.log(req.session.currentState);

    var displayError = null;
    if (req.session.currentState.searchResults < 1) {
      displayError = "No recipes found.";
    }
    res.render("index.ejs", {
      dropDownValues: DROPDOWNVALUES,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      showingBookmarked: req.session.currentState.showingBookmarked,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
      error: displayError,
      scrollToResults: true,
      user: req.session.passport ? req.session.passport.user : null,
    });
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", {
      error: error.response.data.message,
      user: req.session.passport ? req.session.passport.user : null,
    });
  }
});

/* Get-request. Called when the user wants to view a specific recipe based on it's id.*/
router.get("/recipe/view/:id", async (req, res) => {
  try {
    var recipeId = req.params.id;
    var recipe = await spoonacularHandler.getRecipe(recipeId);
    req.session.currentState.chosenRecipe = recipe.data;

    let isFavorit = null;
    if (req.isAuthenticated()) {
      isFavorit = await dbHandler.checkIfRecipeIsFavorit(req.user.id, recipeId);
    }

    res.render("index.ejs", {
      dropDownValues: DROPDOWNVALUES,
      selectedSearchParams: req.session.currentState.selectedSearchParams,
      showingBookmarked: req.session.showingBookmarked,
      searchResults: req.session.currentState.searchResults,
      selectedRecipe: req.session.currentState.chosenRecipe,
      user: req.isAuthenticated() ? req.session.passport.user : null,
      isChosenRecipeFavorite: isFavorit,
    });
  } catch (error) {
    const stringifiedError = JSON.stringify(error.response.data);
    console.log(stringifiedError);
    res.render("index.ejs", {
      error: error.response.data.message,
      user: req.session.passport ? req.session.passport.user : null,
    });
  }
});

export default router;

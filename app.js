import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import * as fs from 'fs';
import { PROTEIN_LIST, COUSINE_LIST} from "./public/constants/searchParameters.js";
import { log } from "console";
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.spoonacular.com";
const API_KEY = process.env.API_KEY;

let userSearch = {
    "cousine":"",
    "protein":"",
    "chosenRecipe":{},
    "searchResults":[]
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

/* Default route. */
app.get("/", (req, res) => {
    userSearch = {
        "cousine":"",
        "protein":"",
        "chosenRecipe":{},
        "searchResults":[]
    }
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});

});

/* Post-request. Called when the user wants to find recipes based on cousine and protein */
app.post("/complexSearch", async (req, res) => {
    console.log(req.body);
    try {
        var recipeList = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${req.body.selectedCousine}&includeIngredients=${req.body.selectedProtein}&number=9&instructionsRequired=true`);
        userSearch.cousine = req.body.selectedCousine;
        userSearch.protein = req.body.selectedProtein;
        userSearch.searchResults = recipeList.data.results;
        //console.log(userSearch);
        if(userSearch.searchResults<1){
            res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch, error: "No recipes found."});
        }
        else{
            res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});
        }
    } catch (error) {
        const stringifiedError = JSON.stringify(error.response.data);
        console.log(stringifiedError);
        res.render("index.ejs", {error: error.response.data.message});
    }
    

    //Dummy data to reduce the amount of API-requests during testing.
/*     let openJSON = fs.readFileSync('./testData/dummyEntries.json', 'utf-8');
    let recipeList = JSON.parse(openJSON);
    userSearch.cousine = req.body.selectedCousine;
    userSearch.protein = req.body.selectedProtein;
    userSearch.searchResults = recipeList;
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch}); */
});

/* Post-request. Called when the user wants to view a specific recipe based on it's id.*/
app.post("/viewRecipe/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        var recipe = await axios.get(`${API_URL}/recipes/${req.params.id}/information?apiKey=${API_KEY}`);
        userSearch.chosenRecipe = recipe.data;
        res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch, recipe: recipe.data});
    } catch (error) {
        const stringifiedError = JSON.stringify(error.response.data);
        console.log(stringifiedError);
        res.render("index.ejs", {error: error.response.data.message});
    }
    

    //Dummy data to reduce the amount of API-requests during testing.
/*     let openJSON = fs.readFileSync('./testData/dummyRecipe.json', 'utf-8');
    let dummyRecipe = JSON.parse(openJSON);
    userSearch.chosenRecipe = dummyRecipe;
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch, recipe: dummyRecipe}); */
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



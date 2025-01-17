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
const apiKey = process.env.API_KEY;

let userSearch = {
    "cousine":"",
    "protein":"",
    "searchResults":[]
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    userSearch = {
        "cousine":"",
        "protein":"",
        "searchResults":[]
    }
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});

});

app.post("/complexSearch", async (req, res) => {
    console.log(req.body);
    var recipeList = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${apiKey}&cuisine=${req.body.selectedCousine}&includeIngredients=${req.body.selectedProtein}&number=9`);
    //console.log(recipeList.data.results);
    userSearch.cousine = req.body.selectedCousine;
    userSearch.protein = req.body.selectedProtein;
    userSearch.searchResults = recipeList.data.results;
    console.log(userSearch);
    
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});

    //Dummy data to reduce the amount of API-requests during testing.
/*     let openJSON = fs.readFileSync('dummyEntries.json', 'utf-8');
    let recipeList = JSON.parse(openJSON);
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, searchResults: recipeList}); */
});

app.post("/viewRecipe/:id", (req, res) => {
    console.log(req.params.id);
    let openJSON = fs.readFileSync('dummyEntries.json', 'utf-8');
    let recipeList = JSON.parse(openJSON);
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, userSearch});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



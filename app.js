import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import * as fs from 'fs';
import { PROTEIN_LIST, COUSINE_LIST} from "./public/constants/searchParameters.js";
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST});

});

app.post("/complexSearch", async (req, res) => {
    console.log(req.body);
/*     var recipeList = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${apiKey}&cuisine=${req.body.selectedCousine}&includeIngredients=${req.body.selectedProtein}&number=9`);
    console.log(recipeList.data.results);
    
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, searchResults: recipeList.data.results}); */

    //Dummy data to reduce the amount of API-requests during testing.
    let openJSON = fs.readFileSync('dummyEntries.json', 'utf-8');
    let recipeList = JSON.parse(openJSON);
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST, searchResults: recipeList});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  /* Populate the entries array with dummy entries. For testing purposes.*/
  function populateDummyArray(){
      let openJSON = fs.readFileSync('dummyEntries.json', 'utf-8');
      let parseJSON = JSON.parse(openJSON);
  
      for(let i = 0; i < parseJSON.length; i++){ 
          var item = parseJSON[i];
          entries.push(new blogEntry(item.title, item.text, item.date));
      }
  };

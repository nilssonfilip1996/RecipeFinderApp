import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { PROTEIN_LIST, COUSINE_LIST} from "./public/constants/searchParameters.js";
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    //var recipeList = await axios.get(`${API_URL}/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=fish,pasta`);
    //console.log(recipeList.data);
    res.render("index.ejs", {cousines: COUSINE_LIST, proteins: PROTEIN_LIST});

});

app.get("/complexSearch", (req, res) => {

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

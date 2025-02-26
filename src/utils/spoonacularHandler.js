import axios from "axios";
import dotenv from "dotenv";
import { PROTEIN_LIST, COUSINE_LIST} from "../../public/constants/searchParameters.js";

dotenv.config();

const API_URL = "https://api.spoonacular.com";
const API_KEY = process.env.API_KEY;

/* 
    Returns recipes that match the criterias passed as parameters.
*/
export function searchForRecipes(cousine, protein, maxResults, sortOption="popularity"){
    return axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cousine}&includeIngredients=${protein}&number=${maxResults}&sort=${sortOption}&instructionsRequired=true`);
};

/* 
    Returns recipe-information matching the input id.
*/
export function getRecipe(id) {
    return axios.get(`${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
};
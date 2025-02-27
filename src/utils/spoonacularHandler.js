import axios from "axios";

const API_URL = "https://api.spoonacular.com";


/* 
    Returns recipes that match the criterias passed as parameters.
*/
export function searchForRecipes(cousine, protein, maxResults, sortOption="healthiness"){
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cousine}&includeIngredients=${protein}&number=${maxResults}&sort=${sortOption}&instructionsRequired=true`);
};

/* 
    Returns recipe-information matching the input id.
*/
export function getRecipe(id) {
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
};
import axios from "axios";

const API_URL = "https://api.spoonacular.com";


/* 
    Returns recipes that match the criterias passed as parameters.
    Params:
        maxResults: The maximum number of results that the api should return.
        sortOption: Sort the search results. Default value: healthiness.
*/
export function searchForRecipes(cousine, protein, maxResults, sortOption="healthiness"){
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cousine}&includeIngredients=${protein}&number=${maxResults}&sort=${sortOption}&instructionsRequired=true`);
};

/* 
    Returns recipe-information matching the input id.
    Params:
        id: The id of the recipe on Spoonacular.com
*/
export function getRecipe(id) {
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
};
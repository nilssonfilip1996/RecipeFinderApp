import axios from "axios";

const API_URL = "https://api.spoonacular.com";

/**
 * Returns recipes that match the criterias passed as parameters.
 * 
 * @param {String} cousine https://spoonacular.com/food-api/docs#Cuisines
 * @param {String} protein Protein source. Note: no vegetarian/vegan option(might be implemented in the future).
 * @param {number} maxResults The maximum amount of recipes that the Spoonacular API is allowed to return. Default value = 9.
 * @param {String} sortOption https://spoonacular.com/food-api/docs#Recipe-Sorting-Options, Default value = "healthiness".
 * @returns recipes that match the criterias passed as parameters.
 */
export function searchForRecipes(cousine, protein, maxResults=9, sortOption="healthiness"){
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cousine}&includeIngredients=${protein}&number=${maxResults}&sort=${sortOption}&instructionsRequired=true`);
};

/* 
    Returns recipe-information matching the input id.
    Params:
        id: The id of the recipe on Spoonacular.com
*/
/**
 * Returns detailed recipe-information.
 * 
 * @param {number} id The recipe-Id used by Spoonacular.com
 * @returns detailed recipe-information.
 */
export function getRecipe(id) {
    const API_KEY = process.env.API_KEY;
    return axios.get(`${API_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
};
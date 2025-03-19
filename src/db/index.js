import pg from "pg";
const { Pool } = pg;

/* Start of initializing a local database.*/

/* function initPostgresDb() {
  const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();
  console.log("DB connection established.");

  return db;
}

const pgDb = initPostgresDb(); */

/* End of initializing a local database.*/

/* Start of initializing a remote database. */

function initRemotePostgresDb() {
  const pool = new Pool({
    connectionString: process.env.DB_CONFIG_LINK,
    ssl: {
        rejectUnauthorized: false
    }
  });
  console.log("DB connection established.");
  return pool;
}

const pgDb = initRemotePostgresDb();

/* End of initializing a remote database. */


/**
 * Returns a users favorite recipes.
 * 
 * @param {number} userId 
 * @returns users favorite recipes.
 */
export async function getUsersRecipes(userId) {
  const foundRecipes = await pgDb.query(
    `SELECT *
    FROM favorite_recipes
    WHERE users_id = $1
    `,
    [userId]
  );
  return foundRecipes.rows;
}


/**
 * Returns true if the api_recipe_id is currently a favorite for user userId. Otherwise false.
 * 
 * @param {number} userId 
 * @param {number} api_recipe_id recipe id found on Spoonacular.com.
 * @returns true if the api_recipe_id is currently a favorite for user userId. Otherwise false.
 */
export async function checkIfRecipeIsFavorit(userId, api_recipe_id) {
  try {
    const recipe = await pgDb.query(
      `SELECT *
      FROM favorite_recipes
      WHERE api_recipe_id = $1
      AND users_id = $2`, [api_recipe_id, userId]
    );
    
    if(recipe.rows.length>0) return true;
    return false;
  } catch (error) {
    console.log("Error is check");
    return false;
  }
}


/**
 * Adds the recipe to a users favorite recipe list in the database.
 * 
 * @param {number} api_recipe_id recipe id found on Spoonacular.com.
 * @param {number} userId 
 * @param {String} recipeTitle 
 * @param {String} recipeImageUrl 
 * @returns true if the data was stored succesfully. False otherwise.
 */
export async function addRecipe(api_recipe_id, userId, recipeTitle, recipeImageUrl) {
  try {
    await pgDb.query(
      `
      INSERT INTO favorite_recipes (api_recipe_id, users_id, title, image)
      VALUES ($1, $2, $3, $4)
      `,
      [api_recipe_id, userId, recipeTitle, recipeImageUrl]
    );
    console.log("Recipe saved!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Removes a recipe from a users favorite recipe list in the database.
 * 
 * @param {number} api_recipe_id 
 * @param {number} userId 
 * @returns true if the data was removed succesfully. False otherwise.
 */
export async function removeRecipe(api_recipe_id, userId){
  try {
    await pgDb.query(
      `
      DELETE FROM favorite_recipes
      WHERE users_id = $1
      AND api_recipe_id = $2
      `,
      [userId, api_recipe_id]
    );
    console.log("Recipe removed!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export default pgDb;

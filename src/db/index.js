import pg from "pg";

function initPostgresDb() {
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

const pgDb = initPostgresDb();

export async function getUsersRecipes(userId) {
  const foundRecipes = await pgDb.query(
    `SELECT *
    FROM favorite_recipes
    WHERE user_id = $1
    `,
    [userId]
  );
}

export async function checkIfRecipeIsFavorit(userId, api_recipe_id) {
  try {
    const recipe = await pgDb.query(
      `SELECT *
      FROM favorite_recipes
      WHERE api_recipe_id = $1
      AND users_id = $2`, [api_recipe_id, userId]);
    console.log("Found recipe: ");
    
    console.log(recipe.rows);
    
    if(recipe.rows.length>0) return true;
    return false;
  } catch (error) {
    console.log("Error is check");
    return false;
  }
}


// TODO: Check if the unique property works as expected.
export async function addRecipe(api_recipe_id, userId, recipeTitle, recipeImageUrl) {
  try {
    await pgDb.query(
      `
      INSERT INTO favorite_recipes (api_recipe_id, users_id, title, image_url)
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

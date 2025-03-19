# RecipeFinderApp

The Recipe Finder App makes it easy when you need help finding recipes!
As of now, you can filter recipes based on cousine and meat type.

Try it out: https://recipefinderapp-dgka.onrender.com/

![recipeFinderAppScreen2](https://github.com/user-attachments/assets/491a5adc-14f2-4138-b028-460b6da08a05)

![recipeFinderAppScreen1](https://github.com/user-attachments/assets/fa5b4f78-d10d-4955-9132-a167f10ee633)


# Installation
If you wish to run the app locally then do the following:

## Prerequisites

### Spoonacular API-key
Create an account at https://spoonacular.com/food-api in order to get your own API-key.
This key will be used for authorization.

### Node.js
Make sure that you have Node.js installed on your computer:
https://nodejs.org/en

### Postgresql
Make sure that you have Postgresql installed on your local machine:
https://www.postgresql.org/download/

<!-- start:code block -->
## Clone this repository
```bash
git clone https://github.com/nilssonfilip1996/RecipeFinderApp
cd RecipeFinderApp
```

## Postgresql setup
Open pgAdmin that you installed earlier.
Create a new database that you will use to save users and recipes.
Documentation: https://www.postgresql.org/docs/

### Database tables:
Create the following two tables within your database by copying and pasting them into pgAdmins query tool:
```bash
CREATE TABLE users (
	id SERIAL UNIQUE,
	full_name VARCHAR(100),
	username VARCHAR(50),
	hashed_password VARCHAR(100)
);

CREATE TABLE favorite_recipes (
	id SERIAL,
	api_recipe_id INTEGER,
	users_id INTEGER REFERENCES users(id),
	title VARCHAR(100),
	image VARCHAR(100),
	UNIQUE(api_recipe_id, users_id)
);
```

## Install dependencies
```bash
npm install
```
This will install the dependencies specified in the package.json file.

# Create a .env file
Create a file named ".env" in the root directory.

Open the file and paste the following:
```bash
# Spoonacular API key.
API_KEY="your_unique_apiKey"    # Needs to be changed.

# Information for connecting to a local Postgres database.
PG_USER="username"              # Needs to be changed.
PG_HOST="hostname"              # Needs to be changed.
PG_DATABASE="databaseName"      # Needs to be changed.
PG_PASSWORD="password"          # Needs to be changed.
PG_PORT="5433"                  # Needs to be changed.

# Session and authentication. 
BCRYPT_SALTROUNDS=12            # Can be changed.
SESSION_SECRET = "SUPERSECRET"  # Can be changed.
```
Replace "your_unique_apiKey" with the one you created earlier.
Replace the Postgres database information.

# Run the app
```bash
node app.js
```
<!-- end:code block -->





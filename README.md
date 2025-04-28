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

**The following NPM packages are used within the project:**
* **Axios**, For requesting and retrieving data from the Spoonacular API.
* **bcrypt**, For encrypting user passwords.
* **body-parser**, For parsing data that might be sent by a client.
* **connect-pg-simple**, For saving user sessions to a postgres database.
* **dotenv**, For loading envioronment variables from a .env file.
* **ejs**, For embedding dynamic JS into markup code.
* **express**, For creating a server-side application. Handles HTTP routing and requests from client.
* **express-session**, Manages client sessions and session-id's.
* **passport**, Used to authenticate requests from clients.
* **passport-local**, For configuring a local strategy used by passport.
* **pg**, Used as a interface between the web application and the PostgreSQL server.

### PostgreSQL
Make sure that you have PostgreSQL installed on your local machine:
https://www.postgresql.org/download/

<!-- start:code block -->
## Clone this repository
```bash
git clone https://github.com/nilssonfilip1996/RecipeFinderApp
cd RecipeFinderApp
```

## PostgreSQL setup
Open pgAdmin that you installed earlier.
Create a new database that you will use to save users and recipes.
Documentation: https://www.postgresql.org/docs/

### Database tables:
Create the following three tables within your database by copying and pasting the following text into pgAdmins query tool:
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

CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON session ("expire");
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
API_KEY="your_unique_apiKey"

# Session and authentication. 
BCRYPT_SALTROUNDS = 12          # Can be changed.
SESSION_SECRET = "SUPERSECRET"  # Can be changed.

#### Database setup. 

### START OF DATABASE CONFIG ####

## Information for connecting to a local Postgres database.
## Replace the fields <> with the correct information for your database.
PG_CONFIG_STRING="postgres://<user>:<password>@<address>:<port>/<database-name>"

#### END OF DATABASE CONFIG ####
```
Replace "your_unique_apiKey" with the one you created earlier.
Replace the fields <> with the correct information for your database.

# Run the app
```bash
node app.js
```
<!-- end:code block -->





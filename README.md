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

<!-- start:code block -->
## Clone this repository
```bash
git clone https://github.com/nilssonfilip1996/RecipeFinderApp
cd RecipeFinderApp
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
API_KEY="your_unique_apiKey"
```
Replace "your_unique_apiKey" with the one you created earlier.

Example:
```bash
API_KEY=2546fgr978vop150x75hs0b7f7m2hfwr
```

# Run the app
```bash
node app.js
```
<!-- end:code block -->





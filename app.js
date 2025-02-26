import express from "express"
import bodyParser from "body-parser"
import recipeRouter from "./src/routes/recipeRoutes.js"

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(recipeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



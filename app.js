import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import indexRouter from "./src/routes/index.js";
import "./src/strategies/local-strategy.js";

const port = 3000;

function initApp() {
  const app = express();

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  //Innitialize passport and the local strategy.
  app.use(passport.initialize());
  app.use(passport.session());

  //Tell Express what routes to use(GET, POST etc).
  app.use(indexRouter);

  return app;
}

const app = initApp();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

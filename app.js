import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import indexRouter from "./src/routes/index.js";
import "./src/strategies/local-strategy.js";

import genFunc from 'connect-pg-simple';
const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.PG_LOCAL_CONFIG_STRING,
});

const port = 3000;

function initApp() {
  const app = express();

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore
  }));

/*   app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  ); */

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

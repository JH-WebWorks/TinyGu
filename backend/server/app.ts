import dotenv from "dotenv";
import express from "express";
import path from "path";
import proxy from "express-http-proxy";
const app = express();
dotenv.config();
const port = process.env.PORT || "8080";

// setup session management
import * as session from "express-session";
import expressMySqlSession from "express-mysql-session";
const MySQLStore = expressMySqlSession(session);

declare module "express-session" {
  export interface SessionData {
    email: string;
  }
}

// define the store of our sessions (it is our database)
console.log(process.env.DB_HOST);
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
});

app.use(
  session.default({
    // sessionID secret, will be changes in production
    secret: "keyboard cat",
    /* set the store as our previously defined databse store, otherwise the session
     will be stored in the process */
    store: sessionStore,
    /* this defines th result of unsetting req.session, 
    'destroy' will delete the session */
    unset: "destroy",
    // this disables the save to the store if nothing changed to the session
    resave: false,
    // this will not save unchanged sessions, it releases some database storage
    saveUninitialized: false,
    cookie: {
      // define, when the coockie expires
      maxAge: 10800000 /*3 hours*/,
      // lax enables the coockie everywhere on our site(correct me if I'm wrong)
      sameSite: "lax",
    },
  })
);

app.set("port", port);

import redirect from "./routes/redirect";
import create from "./routes/create";
import login from "./routes/login";

// security package
// import helmet from "helmet";
// app.use(helmet());

app.use(express.json());

app.use(redirect);

// api routing
app.use("/api/create", create);
app.use("/api/login", login);

// lode index.html
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // eslint-disable-next-line no-console
  console.log("Running in Production");
  const __dirname = path.resolve(path.dirname(""));
  app.use("/static", express.static(path.join(__dirname, "build/static")));
  app.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "build/") });
  });
} else {
  app.use(proxy("http://localhost:3000"));
}

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

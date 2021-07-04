import dotenv from "dotenv";
import express from "express";
import path from "path";
const app = express();
dotenv.config();
const port = process.env.PORT || "8080";

// setup session management
import * as session from "express-session";
import connectPgSimple from "connect-pg-simple";
const PostgreSQLStore = connectPgSimple(session);

declare module "express-session" {
  export interface SessionData {
    email: string;
  }
}

app.use(
  session.default({
    // sessionID secret, will be changes in production
    secret: process.env.SESSION_SECRET,
    /* set the store as our previously defined databse store, otherwise the session
     will be stored in the process */
    store: new PostgreSQLStore({
      conString: process.env.DATABASE_URL,
    }),
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
import admin from "./routes/admin";

// security package
// import helmet from "helmet";
// app.use(helmet());

app.use(express.json());

app.use(redirect);

// api routing
app.use("/api/create", create);
app.use("/api/login", login);
app.use("/api/admin", admin);

// lode index.html
// eslint-disable-next-line no-console
const path_dir = path.resolve(path.dirname(""));
app.use("/static", express.static(path.join(path_dir, "build/static")));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(path_dir, "build/") });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import proxy from "express-http-proxy";
const app = express();
const port = process.env.PORT || "8080";

app.set("port", port);

import redirect from "./routes/redirect";
import create from "./routes/create";
// const create = require("./routes/create");
// import error handling middleware
// const errorHandling = require("./apiFunctions/errorHandling");

import compression from "compression";
app.use(compression());

// security package
// import * as helmet from 'helmet';
// app.use(helmet());

app.use(express.json());

app.use(redirect);

// lade index.html

// api routing
app.use("/api/create", create);

app.use(proxy("http://localhost:3000"));

// start the app
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

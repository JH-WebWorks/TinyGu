require("dotenv").config();

import express from 'express';
const app = express();
const port = process.env.PORT || "3000";

import path from 'path';
// import favicon from 'serve-favicon';

import index from './routes/index';
import redirect from './routes/redirect';
import create from './routes/create';
// const create = require("./routes/create");
// import error handling middleware
// const errorHandling = require("./apiFunctions/errorHandling");

// import mysql credentials
// for compremizing the web request
var compression = require("compression");
app.use(compression());

// security package
var helmet = require("helmet");
app.use(helmet());

app.use(express.json());

// website routing
app.use("/", index);
app.use("/impressum", index);
app.use("/404-Not-Found", index);
app.use(
  "/lib/jquery",
  express.static(path.join(__dirname, '..', "node_modules/jquery/dist"))
);

// app.use(favicon(path.join(__dirname, '..', "public", "favicon.ico")));
app.use("/styles", express.static(path.join(__dirname, '..', 'public', 'styles')));
app.use("/assets", express.static(path.join(__dirname, '..', 'public', 'assets')));
app.use("/pages", express.static(path.join(__dirname, '..', 'public', 'pages')));

// api routing
app.use("/create", create);
app.use(redirect);

// start the app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

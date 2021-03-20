// import enviroments
require("dotenv").config();

// import express
const express = require("express");
const app = express();
const port = process.env.PORT || "3000";

var path = require("path");
var favicon = require("serve-favicon");

const index = require("./routes/index");
const redirect = require("./routes/redirect");
const create = require("./routes/create");
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
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/styles", express.static(__dirname + "/public" + "/styles"));
app.use("/assets", express.static(__dirname + "/public" + "/assets"));
app.use("/pages", express.static(__dirname + "/public" + "/pages"));

// api routing
app.use("/create", create);
app.use(redirect);

// start the app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import dotenv from "dotenv";
import express from "express";
import path from "path";
import proxy from "express-http-proxy";
const app = express();
const port = process.env.PORT || "8080";

app.set("port", port);

import redirect from "./routes/redirect";
import create from "./routes/create";
dotenv.config();

// security package
// import helmet from "helmet";
// app.use(helmet());

app.use(express.json());

app.use(redirect);

// api routing
app.use("/api/create", create);

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

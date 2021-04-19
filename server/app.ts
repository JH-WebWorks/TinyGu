import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import index from "./routes/index";
import compression from "compression";
import favicon from "serve-favicon";

// import API routes
import redirect from "./routes/redirect";
import create from "./routes/create";
dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

app.use(compression());

let allowedOrigins;

if (process.env.NODE_ENV === "production") {
  allowedOrigins = ["https://tinygu.de", "https://goethe.link"];
} else if (process.env.NODE_ENV === "staging") {
  allowedOrigins = ["https://tinygu.jh-webworks.de", "https://goethe.link"];
} else {
  allowedOrigins = [`http://localhost:${port}`];
}

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

// security package
// import helmet from "helmet";
// app.use(helmet());

app.use(express.json());

// website routing
app.use("/", index);
app.use("/impressum", index);
app.use("/404-Not-Found", index);
app.use(
  "/lib/jquery",
  express.static(path.join(__dirname, "..", "node_modules/jquery/dist"))
);

// serving frontend
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.use(
  "/styles",
  express.static(path.join(__dirname, "..", "public", "styles"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "public", "assets"))
);
app.use(
  "/pages",
  express.static(path.join(__dirname, "..", "public", "pages"))
);

// api routing
app.use("/create", create);
app.use(redirect);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

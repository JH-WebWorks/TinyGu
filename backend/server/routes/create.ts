import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
import urlParser from "url";
const router = express.Router();
const prisma = new PrismaClient();

import { allowedUrls } from "../config.json";

async function insertIntoDatabase(
  req: Request,
  res: Response,
  keyword: string
) {
  try {
    await prisma.links
      .create({
        data: {
          url: req.body.url,
          keyword: keyword,
        },
      })
      .then((inserted) => {
        res.status(200).json(inserted);
      });
  } catch (e) {
    console.log(e);
    if (e.code === "P2002") {
      return res.status(400).json({ error: "keyword already exists" });
    } else {
      return res.status(400).json({ error: "the keyword is not valid" });
    }
  }
}

function generateKeyword(
  length: number,
  callback: (req: Request, res: Response, keyword: string) => void,
  req: Request,
  res: Response
) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  prisma.links
    .count({
      where: { keyword: result },
    })
    .then((count) => {
      if (count === 0) {
        callback(req, res, result);
      } else {
        generateKeyword(length + 1, callback, req, res);
      }
    });
}

function getDomain(url: string) {
  const parsedURL = urlParser.parse(url).host;

  if (parsedURL === null) {
    throw Error("host is null");
  }
  const hostArray = parsedURL.split(".");
  return hostArray.slice(Math.max(hostArray.length - 2, 0)).join(".");
}

function validateUrl(url: string) {
  if (url === "" || url === undefined || url === null) {
    console.log(url);
    return false;
  }
  if (urlParser.parse(url).host === null) {
    return false;
  }
  if (!allowedUrls.includes(getDomain(url))) {
    return false;
  }
  return true;
}

/* GET users listing. */
router.post("/", (req, res) => {
  if (!validateUrl(req.body.url)) {
    return res.status(400).json({ error: "the url is not valid" });
  }
  if (
    req.body.keyword === "" ||
    req.body.keyword === null ||
    req.body.keyword === undefined
  ) {
    generateKeyword(5, insertIntoDatabase, req, res);
  } else {
    const regex = RegExp("^[A-Za-z0-9-]{3,100}$");
    if (!regex.test(req.body.keyword)) {
      return res.status(400).json({ error: "the keyword is not valid" });
    }
    insertIntoDatabase(req, res, req.body.keyword);
  }
});

export default router;
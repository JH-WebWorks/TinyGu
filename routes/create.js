const express = require("express");
const router = express.Router();
require("dotenv").config();
const urlParser = require("url");
const allowedUrls = require("../config.json").allowedUrls;

function insertIntoDatabase(req, res, keyword) {
  Link.create({ url: req.body.url, keyword: keyword })
    .then((inserted) => res.status(200).json(inserted.dataValues))
    .catch((error) => {
      if (error.errors[0].message === "PRIMARY must be unique") {
        res.status(400).json({ error: "keyword already exists" });
      } else {
        res.status(400).json({
          error: "something went wrong please contact the administrator",
        });
        throw error;
      }
    });
}

function generateKeyword(length, callback, req, res) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  Link.count({ where: { keyword: result } }).then((count) => {
    if (count === 0) {
      callback(req, res, result);
    } else {
      generateKeyword(length + 1, callback, req, res);
    }
  });
}

function getDomain(url) {
  var hostArray = urlParser.parse(url).host.split(".");
  return hostArray.slice(Math.max(hostArray.length - 2, 0)).join(".");
}

function validateUrl(url) {
  if (url === "" || url === undefined || url === null) {
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

const Link = require("../db/LinkModel");

/* GET users listing. */
router.post("/", function (req, res, next) {
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
    console.log(!regex.test(req.body.keyword));
    if (!regex.test(req.body.keyword)) {
      return res.status(400).json({ error: "the keyword is not valid" });
    }
    console.log("hello i'm here");
    insertIntoDatabase(req, res, req.body.keyword);
  }
});

module.exports = router;

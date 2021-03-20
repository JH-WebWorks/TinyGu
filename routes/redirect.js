const express = require("express");
const router = express.Router();
require("dotenv").config();
var path = require("path");

const Link = require("../db/LinkModel");
const Click = require("../db/ClickModel");

/* GET users listing. */
router.get("/:shortlink", function (req, res, next) {
  Link.findOne({
    where: { keyword: req.params.shortlink },
    attributes: ["url"],
  }).then((link) => {
    console.log(link);
    if (link === null) {
      res.redirect("/404-Not-Found");
    } else {
      Click.create({ linkKeyword: req.params.shortlink });
      res.redirect(link.get("url"));
    }
    // project will be the first entry of the Projects table with the title 'aProject' || null
    // project.get('title') will contain the name of the project
  });
});

module.exports = router;

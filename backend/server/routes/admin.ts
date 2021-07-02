import { PrismaClient } from "@prisma/client";
import express from "express";
import validateUrl from "../validator/url";
import validateKeyword from "../validator/keyword";
const router = express.Router();
const prisma = new PrismaClient();

// this thing handles the authorization
router.use(function (req, res, next) {
  if (!req.session.email) {
    res.status(401).send();
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  if (typeof req.query.search !== "string") {
    return res.status(400).send();
  }
  prisma.links
    .findMany({
      where: {
        OR: [
          {
            keyword: {
              contains: String(req.query.search),
            },
          },
          {
            url: {
              contains: String(req.query.search),
            },
          },
        ],
      },
      take: 500,
    })
    .then((result) => res.status(200).send(result));
});

router.delete("/", (req, res) => {
  if (typeof req.body.keyword !== "string") {
    return res.status(400).send();
  }
  prisma.links
    .delete({
      where: {
        keyword: req.body.keyword,
      },
    })
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
});

router.patch("/:keyword", (req, res) => {
  if (
    typeof req.body.keyword !== "string" ||
    typeof req.body.url !== "string" ||
    typeof req.params.keyword !== "string"
  ) {
    return res.status(400).send();
  }

  if (!validateUrl(req.body.url)) {
    return res.status(400).json({ error: "the url is not valid" });
  }
  if (!validateKeyword(req.body.keyword)) {
    return res.status(400).json({ error: "the keyword is not valid" });
  }

  prisma.links
    .update({
      where: { keyword: req.params.keyword },
      data: {
        keyword: req.body.keyword,
        url: req.body.url,
        editstamp: new Date(),
      },
    })
    .then((keyword) => res.status(200).send(keyword))
    .catch((e) => {
      switch (e.code) {
        case "P2025":
          res.status(404).json({ error: "keyword not found" });
          break;
        default:
          res.status(500).send();
          break;
      }
    });
});

export default router;

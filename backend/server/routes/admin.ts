import { PrismaClient } from "@prisma/client";
import express from "express";
import { nextTick, send } from "process";
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

export default router;

import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../db";
const router = express.Router();
dotenv.config();

/* GET users listing. */
router.get("/:shortlink", (req: Request, res: Response, next: NextFunction) => {
  prisma.links
    .findUnique({
      where: {
        keyword: req.params.shortlink,
      },
    })
    .then((link) => {
      if (link === null) {
        next();
      } else {
        prisma.clicks
          .create({
            data: {
              linkKeyword: req.params.shortlink,
            },
          })
          .then();
        res.redirect(link.url);
      }
    });
});

export default router;

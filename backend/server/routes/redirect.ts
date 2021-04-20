import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();
dotenv.config();

/* GET users listing. */
router.get("/:shortlink", (req: Request, res: Response) => {
  prisma.links
    .findUnique({
      where: {
        keyword: req.params.shortlink,
      },
    })
    .then((link) => {
      if (link === null) {
        res.redirect("/404-Not-Found");
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

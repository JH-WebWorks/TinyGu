import { validatePassword } from "../crypto";
import prisma from "../db";
import express from "express";
const router = express.Router();

async function validateUser(userEmail: string, password: string) {
  if (typeof userEmail !== "string" || typeof password !== "string") {
    return false;
  }
  const user = await prisma.user.findFirst({ where: { email: userEmail } });
  if (user) {
    return validatePassword(password, user.password_hash, user.salt);
  }
}

router.get("/", async (req, res) => {
  if (req.session.email) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

router.post("/", async (req, res) => {
  const validLogin = await validateUser(req.body.email, req.body.password);
  if (validLogin) {
    req.session.email = req.body.email;
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

router.delete("/", async (req, res) => {
  req.session.destroy(() => res.status(200).send());
});

export default router;

import { validatePassword } from "../crypto";
import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();
const prisma = new PrismaClient();

async function validateUser(userEmail: string, password: string) {
  const user = await prisma.user.findFirst({ where: { email: userEmail } });
  // console.log(validatePassword(password, user.password_hash, user.salt));
  return validatePassword(password, user.password_hash, user.salt);
}

router.post("/", async (req, res) => {
  const validLogin = await validateUser(req.body.email, req.body.password);
  console.log(validLogin);
  if (validLogin) {
    req.session.email = req.body.email;
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

export default router;

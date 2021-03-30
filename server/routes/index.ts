import express, { Request, Response } from 'express';
const router = express.Router();
import path from 'path';

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', "..", "public", "index.html"));
});

export default router;

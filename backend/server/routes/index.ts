import express, { Request, Response } from 'express';
const router = express.Router();
import path from 'path';

/* GET home page. */
router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', "..", "public", "index.html"));
});

router.get("/api/test", (req: Request, res: Response) => {
  res.send('API is working properly');
});

export default router;

import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import path from 'path';

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.sendFile(path.join(__dirname, '..', "..", "public", "index.html"));
});

export default router;

import { Response, Request } from "express";
import { Router } from "express";
import { calculate, mean } from "../../utils/functions";
import fs from "fs";
import path from "path";
import { Nums } from "../../interfaces/nums";

const router = Router();

router.get("/", (req: Request<{}, {}, {}, Nums>, res: Response) => {
  const result = calculate(req.query.nums, "mean", mean);

  if (req.query.save === "false") {
    return res.json({ message: result });
  }

  fs.appendFile(
    path.join(__dirname, "..", "results.txt"),
    result + "\n",
    (error) => {
      if (error) {
        throw error;
      }
      return res.json({ message: result });
    }
  );
});

export default router;

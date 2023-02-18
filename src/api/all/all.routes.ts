import { Response, Request } from "express";
import { Router } from "express";
import { calculate, mean, median, mode } from "../../utils/functions";
import fs from "fs";
import path from "path";
import { Nums } from "../../interfaces/nums";

const router = Router();

router.get("/", (req: Request<{}, {}, {}, Nums>, res: Response) => {
  const meanResult = calculate(req.query.nums, "mean", mean);
  const medianResult = calculate(req.query.nums, "median", median);
  const modeResult = calculate(req.query.nums, "mode", mode);

  const result = meanResult + "\n" + medianResult + "\n" + modeResult + "\n";

  if (req.query?.save === "false") {
    return res.json(result.split("\n").filter(Boolean));
  }

  fs.appendFile(path.join(__dirname, "..", "results.txt"), result, (error) => {
    if (error) {
      throw error;
    }
    return res.json(result.split("\n").filter(Boolean));
  });
});

export default router;

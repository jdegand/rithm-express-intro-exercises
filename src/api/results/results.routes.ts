import { Response, Request, NextFunction } from "express";
import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  if (!fs.existsSync(path.join(__dirname, "..", "results.txt"))) {
    throw { status: 404, message: "File does not exist" };
  }

  const results = fs.readFileSync(
    path.join(__dirname, "..", "results.txt"),
    "utf-8"
  );

  if (results.length === 0) {
    throw { status: 404, message: "There are no results yet." };
  }

  const resultsArray = results.split("\n").filter(Boolean);

  res.json(resultsArray);
});

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  fs.truncate(path.join(__dirname, "..", "results.txt"), 0, function () {
    res.json({ status: 200, message: "Results cleared." });
  });
});

export default router;

/*
process.on('uncaughtException', err => {
  console.log(`There was an uncaught error: ${JSON.stringify(err, null, 2)}`)
  process.exit(1);
})
*/

/*
// crashes the server - even when wrapped in a try-catch 

fs.readFile(path.join(__dirname, '..', 'results.txt'),'utf-8', (err,data) => {
  if(err) throw err;
  
  if(!data) {
    throw {status: 404, message: 'There are no results yet.'}
  }
  
  res.json(data);
*/

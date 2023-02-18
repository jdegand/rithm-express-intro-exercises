import express from "express";
import mean from "./mean/mean.routes";
import median from "./median/median.routes";
import mode from "./mode/mode.routes";
import results from "./results/results.routes";
import all from "./all/all.routes";
import items from "./items/items.routes";

const router = express.Router();

router.use("/mean", mean);
router.use("/median", median);
router.use("/mode", mode);
router.use("/results", results);
router.use("/all", all);
router.use("/items", items);

export default router;

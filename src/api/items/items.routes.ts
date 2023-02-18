import { Response, Request } from "express";
import { Router } from "express";
import { Item } from "../../interfaces/item";
import crypto from "crypto";

const router = Router();

let databaseArray: Item[] = [
  {
    id: "1",
    name: "TV",
    price: 500,
    description: "LG 55",
  },
];

router.get("/", (req: Request, res: Response) => {
  res.json(databaseArray);
});

router.post("/", (req: Request, res: Response) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: req.body.name,
    price: req.body.price,
    description: req.body?.description || "",
  };

  if (!newItem.name || !newItem.price) {
    throw { status: 400, message: "Name and price are required." };
  }

  databaseArray.push(newItem);
  res.status(201).json(databaseArray);
});

router.put("/", (req: Request, res: Response) => {
  const item = databaseArray.find((item) => item.id === req.body.id);
  if (!item) {
    throw { status: 400, message: `Item ID ${req.body.id} not found` };
  }
  if (req.body.name) item.name = req.body.name;
  if (req.body.price) item.price = req.body.price;
  if (req.body.description) item.description = req.body.description;

  res.json(databaseArray);
});

router.delete("/", (req: Request, res: Response) => {
  const item = databaseArray.find((item) => item.id === req.body.id);
  if (!item) {
    throw { status: 400, message: `Item ID ${req.body.id} not found` };
  }

  databaseArray = databaseArray.filter((item) => item.id !== req.body.id);

  res.json(databaseArray);
});

router.get("/:id", (req: Request, res: Response) => {
  const item = databaseArray.find((item) => item.id === req.params.id);
  if (!item) {
    throw { status: 400, message: `Item ID ${req.params.id} not found` };
  }
  res.json(item);
});

export default router;

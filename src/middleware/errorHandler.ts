import { NextFunction, Request, Response } from "express";
import { StatusError } from "../interfaces/statusError";

export function errorHandler(
  error: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(error.status || 500)
    .json({ status: error.status, message: error.message });
  next();
}

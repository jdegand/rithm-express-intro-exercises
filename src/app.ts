import express, { Application, Response, Request, NextFunction } from "express";
import helmet from "helmet";
import api from "./api";
import { errorHandler } from "./middleware/errorHandler";
import { StatusError } from "./interfaces/statusError";

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Render view here for documentation");
});

app.use("/api", api);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: StatusError = new Error(
    `${req.method} ${req.originalUrl} not found`
  );
  error.status = 404;
  next(error);
});

app.use(errorHandler);

export default app;

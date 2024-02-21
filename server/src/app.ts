import express, { Request, Response } from "express";
import { MessageResponse } from "./interfaces/messageResponse";
import router from "./route/index";
import { errorHandler, notFound } from "./middleware/middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

app.use("api/v1", router);
app.use(notFound);

app.use(errorHandler);

export default app;

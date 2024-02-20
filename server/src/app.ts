import express, { Request, Response } from "express";
import { MessageResponse } from "./interfaces/messageResponse";
const app = express();

app.get<{}, MessageResponse>("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

export default app;

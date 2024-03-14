import express, { Request, Response } from "express";
import { MessageResponse } from "./interfaces/messageResponse";
import router from "./route/index";
import { errorHandler, notFound } from "./middleware/middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Example: Echo back received message
  socket.on("message", (data) => {
    console.log("Received message:", data);
    io.emit("message", data); // Broadcast the message to all connected clients
  });
});

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

export default server;

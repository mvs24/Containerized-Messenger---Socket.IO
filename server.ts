import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import followRoutes from "./routes/follow";
import dotenv from "dotenv";
import { globalErrorHandler } from "./controllers/error";

dotenv.config({
  path: "./config.env",
});

const app = express();

app.use(express.json());

const API_ENDPOINT = "/api/v1";

app.use(`${API_ENDPOINT}/users`, userRoutes);
app.use(`${API_ENDPOINT}/followers`, followRoutes);

app.use(globalErrorHandler);

const handleSocketEvents = (socket: Socket) => {};

const init = async () => {
  try {
    const mongoConnectionURI: string =
      process.env.DB_CONNECTION_URI || "mongodb://localhost:27017/messenger";

    await mongoose.connect(mongoConnectionURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected successfully!");

    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    io.on("connection", (socket: Socket) => {
      console.log(socket.id);
      handleSocketEvents(socket);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

init();

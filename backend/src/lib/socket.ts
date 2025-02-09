import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const userId = socket.handshake.query.userId;

  //@ts-ignore
  if (userId) userSocketMap[userId] = socket.id;
console.log(userSocketMap)
  //io.emit is used to emit the below message to all the connected clients
  socket.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    const userId = Object.keys(userSocketMap).find(
      //@ts-ignore
      (key) => userSocketMap[key] === socket.id
    );
    if (userId) {
      //@ts-ignore
      delete userSocketMap[userId];
    }

    socket.broadcast.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

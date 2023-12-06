const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 5000;
app.use(express.static("public"));
httpServer.listen(PORT);

const players = [];
let count = 1;
io.on("connection", (socket) => {
    socket.on("new player", () => {
        players.push({
            id: socket.id,
            count: count,
        });
        count++;
        socket.emit("state", players);
    });
    socket.on("date", now => {
      socket.emit("return now from server", now)
      
    })
    socket.on("disconnect", () => {
        players.pop();
        socket.emit("state", players);
        count--;
    });
});

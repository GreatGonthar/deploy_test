const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const cors = require("cors");
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.static("public"));

const getPlayer = require("./player").getPlayer;
const dellPlayer = require("./player").dellPlayer;
const playerMove = require("./player").playerMove;
const getPlayerSinCos = require("./player").getPlayerSinCos;
const createDots = require("./dot").createDots;
const dellDot = require("./dot").dellDot;

const port = process.env.PORT || 3000;
const WIDTH = 340;
const HEIGHT = 600;
let state = {
    background: "Default_Deep_forest_photo_realism_green_trees_1.jpg",   
    dotsNum: 0,
    mapSize: 0,
    initialSpeed: 3,    
};

httpServer.listen(port, () => console.log(`Server listening on port ${port}`));

let players = {};
let dots = {};

io.on("connection", (socket) => {
    console.log(
        `New client connected ${socket.id} players = ${
            Object.keys(players).length
        }`
    );
    getPlayer(players, socket, state.initialSpeed, WIDTH, HEIGHT);
    socket.emit("create player", { players, state, dots });
    socket.on("ping", function (data) {
        socket.emit("pong", data);
    });
    socket.on("form data", (formData) => {
        state = formData;
        dots = createDots(8, state.dotsNum, state.mapSize);      
        io.sockets.emit("create player", { players, state, dots });
    });
    socket.on("player name", (data) => {
        players[socket.id].name = data;
    });
    socket.on("dellDot", (id) => {
        dellDot(dots, id, players[socket.id], state.mapSize, io);
    });
    socket.on("dellPlayer", (ID) => {       
        dellPlayer(ID, players, socket);
    });
    socket.on("touchCords", (touchCords) => {
        getPlayerSinCos(touchCords, players[socket.id]);
    });
    socket.on("disconnect", () => {
        delete players[socket.id];
        console.log(
            `player ${socket.id} disconnected, players = ${
                Object.keys(players).length
            }`
        );
        if (Object.keys(players).length === 0) {
            dots = {};
            dotId = 0;
            state = {
                background: "Default_Deep_forest_photo_realism_green_trees_1.jpg",   
                dotsNum: 0,
                mapSize: 0,
                initialSpeed: 3,    
            };
        }
    });
});
setInterval(() => {
    playerMove(players);
    io.sockets.emit("main loop", players);
}, 1000 / 30);

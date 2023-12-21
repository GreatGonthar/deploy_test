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

const port = process.env.PORT || 3000;
const WIDTH = 340;
const HEIGHT = 600;
let environment = {
    background: "",
    dotsNum: 0,
    mapSize: 0,
    initialSpeed: 5,
    FPS: 60,
};

httpServer.listen(port, () => console.log(`Server listening on port ${port}`));

let players = {};
let dots = {};
let dotId = 0;
class Player {
    constructor(props) {
        this.id = props.id;
        this.color = props.color;
        this.r = props.r;
        this.x = props.x;
        this.y = props.y;
        this.tx = props.x;
        this.ty = props.y;
        this.sin = 0;
        this.cos = 0;
        this.velocity = props.velocity;
    }
}
class Dot {
    constructor(id, x, y, r = 5) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

io.on("connection", (socket) => {
    console.log(
        `New client connected ${socket.id} players = ${
            Object.keys(players).length
        }`
    );
    players[socket.id] = new Player({
        id: socket.id,
        r: 10,
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        color: getRandomColor(),
        velocity: environment.initialSpeed,
    });
    socket.emit("create player", { players, environment, dots });

    socket.on("form data", (formData) => {
        environment = formData;
        console.log("form data", environment);
        dots = createDots(5, environment.dotsNum, environment.mapSize);
        players[socket.id].velocity = environment.initialSpeed;
        socket.emit("create player", { players, environment, dots });
    });

    socket.on("ping", function (data) {
        socket.emit("pong", data);
    });
    socket.on("dellDot", (id) => {
        dellDot(dots, id, players[socket.id], environment.mapSize, socket);
    });
    socket.on("dellPlayer", (id) => {
        players[id].r = 10;
        players[id].x = Math.floor(Math.random() * environment.mapSize);
        players[id].y = Math.floor(Math.random() * environment.mapSize);
        players[id].tx = players[id].x
        players[id].ty = players[id].y
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
            environment = {
                background: "",
                dots: 0,
                mapSize: 0,
                initialSpeed: 5,
                FPS: 60,
            };
        }
    });

    socket.on("touchCords", (touchCords) => {
        let player = players[socket.id];
        let myHypot = Math.hypot(
            touchCords.x - player.x,
            touchCords.y - player.y
        );
        player.tx = touchCords.x;
        player.ty = touchCords.y;

        player.sin = (player.y - touchCords.y) / myHypot;
        player.cos = (player.x - touchCords.x) / myHypot;
    });
});
setInterval(() => {
    move();
    io.sockets.emit("arr players", players);
}, 1000 / 30);

function move() {
    for (let id in players) {
        let player = players[id];
        let myHypot = Math.hypot(player.tx - player.x, player.ty - player.y);
        player.velocity = (environment.initialSpeed / player.r) * 10;
        // console.log(player.velocity)
        if (myHypot > player.velocity) {
            player.x -= player.cos * player.velocity;
            player.y -= player.sin * player.velocity;
        }
    }
}
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function createDots(r, n, mapSize) {
    dots = {};
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * mapSize);
        let y = Math.floor(Math.random() * mapSize);

        let id = dotId++;
        let dot = new Dot(id, x, y, r);
        dots[id] = dot;
    }
    return dots;
}

function dellDot(dots, id, player, mapSize, socket) {
    if (+id || +id === 0) {
        dots[id].x = Math.floor(Math.random() * mapSize);
        dots[id].y = Math.floor(Math.random() * mapSize);
        socket.emit("newCordsDot", dots[id]);
        if (+id % 10 > 1 && player.r < 250) {
            player.r += 1;
        } else {
            player.r -= 2;
        }
    }
}


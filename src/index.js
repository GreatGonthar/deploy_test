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
    dots: 0,
    mapSize: 0,
    initialSpeed: 1,
    FPS: 60,
};

httpServer.listen(port, () => console.log(`Server listening on port ${port}`));

let players = {};
class Player {
    constructor(props) {
        this.id = props.id;
        this.color = props.color;
        this.r = props.r
        this.x = props.x;
        this.y = props.y;
        this.tx = props.x;
        this.ty = props.y;
        this.sin = 0;
        this.cos = 0;
        this.velocity = props.velocity
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
        r: 30,
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        color: getRandomColor(),
        velocity: environment.initialSpeed
    });
    socket.emit("create player", { players, environment });

    socket.on("form data", (formData) => {
        environment = formData;
        players[socket.id].velocity = environment.initialSpeed
        socket.emit("create player", { players, environment });
    });

    socket.on("ping", function (data) {
        socket.emit("pong", data);
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
        console.log(
            `player ${socket.id} disconnected, players = ${
                Object.keys(players).length
            }`
        );
        if (Object.keys(players).length === 0) {
            environment = {
                background: "",
                dots: 0,
                mapSize: 0,
                initialSpeed: 1,
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

        player.sin =
            ((player.y - touchCords.y) / myHypot) * environment.initialSpeed;
        player.cos =
            ((player.x - touchCords.x) / myHypot) * environment.initialSpeed;
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
        if (myHypot > 3) {
            player.x -= player.cos;
            player.y -= player.sin;
        }
    }
}
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

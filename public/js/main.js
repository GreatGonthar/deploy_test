import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { drawAll } from "./draw/drawAll.js";
import {drawToutchDot} from "./draw/drawToutchDot.js"
import { getFormData } from "./formLogic.js";
const WIDTH = 340;
const HEIGHT = 600;

const socket = io();

const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = "silver";
const ctx = canvas.getContext("2d");
let ping = 0;
let mapSize = 0;
let translate = { x: WIDTH / 2, y: HEIGHT / 2 };

// let formData = getFormData()
socket.on("create player", ({ players, environment }) => {
    console.log(environment);
    mapSize = environment.mapSize;
    getFormData(players, socket);
});

socket.on("pong", function (data) {
    ping = Date.now() - data;
});

socket.on("arr players", (players) => {
    let player = players[socket.id];
    translate.x = WIDTH / 2 - player.x;
    translate.y = HEIGHT / 2 - player.y;
    drawAll(players, ctx, ping, mapSize, canvas.width, canvas.height, translate);
    drawToutchDot(ctx, player, translate)
});
setInterval(() => {
    socket.emit("ping", Date.now());
}, 500);

canvas.addEventListener("click", (event) => {
    event.preventDefault();
    let touchCords = {
        x: event.clientX - canvas.getBoundingClientRect().left - translate.x,
        y: event.clientY - canvas.getBoundingClientRect().top - translate.y,
    };

    socket.emit("touchCords", touchCords);
});

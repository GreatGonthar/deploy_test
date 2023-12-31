import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { drawClearRect } from "./draw/drawClearRect.js";
import { drawBorder } from "./draw/drawBorder.js";
import { drawPlayers } from "./draw/drawPlayers.js";
import { drawToutchDot } from "./draw/drawToutchDot.js";
import { drawNavigateText } from "./draw/drawNavigateText.js";
import { drawDots } from "./draw/drawDots.js";
import { getFormData } from "./formLogic.js";
import { dotCollision } from "./utils/dotCollision.js";
import { playerCollision } from "./utils/playerCollision.js";

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
const background = new Image();
let clientDots = {};
let translate = { x: WIDTH / 2, y: HEIGHT / 2 };
let navigateTextArea = document.getElementById("NavigateText");

let selectElement = document.getElementById("select");
selectElement.addEventListener("change", function() {
    const selectedValue = selectElement.value;   
    background.src = `./js/draw/${selectedValue}`
  });

socket.on("create player", ({ players, state, dots }) => {
    mapSize = state.mapSize;
    background.src = `./js/draw/${state.background}`;
    
    clientDots = dots;
    for (let id in players) {
        let player = players[id];
        player.velocity = state.initialSpeed;
    }   
    getFormData(players, dots, socket);
});

socket.on("pong", function (data) {
    ping = Date.now() - data;
});

socket.on("main loop", (players) => {
    let player = players[socket.id];
    translate.x = WIDTH / 2 - player.x;
    translate.y = HEIGHT / 2 - player.y;
    dotCollision(player, clientDots, socket, WIDTH, HEIGHT);
    playerCollision(player, players, socket)
    drawNavigateText(navigateTextArea, players,socket.id, player.name, ping);
    drawClearRect(ctx, background, WIDTH, HEIGHT, translate)
    // ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawBorder(ctx, mapSize, translate);
    drawPlayers(players, ctx ,translate)
    drawDots(ctx, clientDots, translate);
    drawToutchDot(ctx, player, translate);
});
socket.on("newCordsDot", (dot) => {
    clientDots[dot.id] = dot;
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





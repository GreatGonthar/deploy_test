import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { drawAll } from "./draw/drawAll.js";
import { drawToutchDot } from "./draw/drawToutchDot.js";
import { drawNavigateText } from "./draw/drawNavigateText.js";
import { drawDots } from "./draw/drawDots.js";
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
let clientDots = {};
let translate = { x: WIDTH / 2, y: HEIGHT / 2 };
let navigateTextArea = document.getElementById("NavigateText");

// let formData = getFormData()
socket.on("create player", ({ players, environment, dots }) => {
    mapSize = environment.mapSize;
    clientDots = dots;
    for (let id in players) {
        let player = players[id];
        player.velocity = environment.initialSpeed;
    }
    window.players = players;
    getFormData(players, socket);
});

socket.on("pong", function (data) {
    ping = Date.now() - data;
});

socket.on("arr players", (players) => {
    let player = players[socket.id];
    translate.x = WIDTH / 2 - player.x;
    translate.y = HEIGHT / 2 - player.y;
    dotCollision(player, clientDots, socket);
    playerCollision(player, players, socket)
    drawNavigateText(navigateTextArea, players, socket.id, ping);
    drawAll(players, ctx, mapSize, canvas.width, canvas.height, translate);
    drawToutchDot(ctx, player, translate);
    drawDots(ctx, clientDots, translate);
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

function dotCollision(player, dots, socket) {
    if (Object.keys(dots).length > 0) {
        for (let id in dots) {
            let dot = dots[id];
            let myHypot = Math.hypot(dot.x - player.x, dot.y - player.y);
            if (myHypot < player.r) {
                dots[id].r = 1;
                dots[id].x = Math.random() * WIDTH * 2;
                dots[id].y = Math.random() * HEIGHT * 2;
                socket.emit("dellDot", id);
            }
        }
    }
}

function playerCollision(myPlayer, players, socket) {
    
    for(let id in players ){  
    let otherPlayer = players[id]; 
    const distance = Math.sqrt(
        (otherPlayer.x - myPlayer.x) ** 2 +
            (otherPlayer.y - myPlayer.y) ** 2
    );    
    if (
        distance < myPlayer.r &&
        distance > 0 &&
        otherPlayer.r < myPlayer.r / 2
    ) {
       
        otherPlayer.r = 10;
        socket.emit("dellPlayer", id);
    }
}
};

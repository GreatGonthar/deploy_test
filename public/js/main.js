import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const WIDTH = 340;
const HEIGHT = 600;

const socket = io();

const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = "silver";
const ctx = canvas.getContext("2d");
let ping = 0
socket.on("create player", (data) => {
    console.log(data);
});

socket.on("pong", function (data) {
    ping = Date.now() - data;    
});


socket.on("arr players", (players) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `20px Emulogic`;
    ctx.fillStyle = "black";
    ctx.fillText(`ping: ${ping}`, 10, 30);
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.fillStyle = player.color;
        ctx.arc(player.x, player.y, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
});
setInterval(()=> {socket.emit('ping', Date.now())}, 500)

canvas.addEventListener("click", (event) => {
    event.preventDefault();

    let touchCords = {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
    };
    
    socket.emit("touchCords", touchCords);
});

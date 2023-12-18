export const drawAll = (players, ctx, pingText, mapSize, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `20px Emulogic`;
    ctx.fillStyle = "black";
    ctx.fillText(`ping: ${pingText}`, 10, 30);
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.rect(0 , 0 , mapSize, mapSize);
    ctx.stroke();
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.fillStyle = player.color;
        ctx.arc(player.x, player.y, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}
const WIDTH = 340;
const HEIGHT = 600;


export const drawAll = (players, ctx, pingText, mapSize, width, height,translate) => {

    ctx.clearRect(0, 0, width, height);
    ctx.font = `20px Emulogic`;
    ctx.fillStyle = "black";
    ctx.fillText(`ping: ${pingText}`, 10, 30);
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.rect(translate.x , translate.y , mapSize, mapSize);
    ctx.stroke();
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.fillStyle = player.color;
        ctx.arc(player.x+translate.x, player.y+translate.y, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}
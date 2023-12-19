const WIDTH = 340;
const HEIGHT = 600;


export const drawAll = (players, ctx, mapSize, width, height,translate) => {
    
    ctx.clearRect(0, 0, width, height);   
    ctx.beginPath();
    ctx.setLineDash([3, 8])
    ctx.lineWidth = 2
    ctx.strokeStyle = "blue";
    ctx.rect(translate.x , translate.y , mapSize, mapSize);
    ctx.stroke();
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.fillStyle = player.color;     
        ctx.arc(player.x+translate.x, player.y+translate.y, player.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}
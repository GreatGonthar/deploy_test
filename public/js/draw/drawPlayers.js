const WIDTH = 340;
const HEIGHT = 600;


export const drawPlayers = (players, ctx ,translate) => {      
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.fillStyle = player.color;     
        ctx.arc(player.x+translate.x, player.y+translate.y, player.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}
const WIDTH = 340;
const HEIGHT = 600;


export const drawPlayers = (players, ctx ,translate) => {      
    for (let id in players) {
        let player = players[id];
        ctx.beginPath();
        ctx.font = `${player.r*2}px Emulogic`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "red";   
        ctx.fillStyle = "red"; 
        ctx.fillText(player.skin, player.x+translate.x, player.y+translate.y+player.r/8) 
        ctx.font = `${player.r/1.5}px Emulogic`;
        ctx.fillText(
        player.name,
        player.x + translate.x,
        player.y + translate.y - player.r/1.5
    );
        // ctx.arc(player.x+translate.x, player.y+translate.y, player.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }
}

export const drawToutchDot = (ctx, player, translate) => {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.arc(player.tx+translate.x, player.ty+translate.y, 10, 0, Math.PI * 2, true);
    ctx.stroke();
}

export const drawToutchDot = (ctx, player, translate) => {
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.setLineDash([])
    ctx.arc(player.tx+translate.x, player.ty+translate.y, 4, 0, Math.PI * 2, true);
    ctx.stroke();
}
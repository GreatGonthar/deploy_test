const WIDTH = 340;
const HEIGHT = 600;



export const drawDots = (ctx, dots, translate) => {
    for (let id in dots) {
        let dot = dots[id];
        ctx.beginPath();
        if (+id % 10 > 1) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.font = `${dot.r*2}px Emulogic`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // ctx.arc(
        //     dot.x + translate.x,
        //     dot.y + translate.y,
        //     dot.r,
        //     0,
        //     Math.PI * 2,
        //     true
        // );
        ctx.fillText(dot.skin, dot.x+translate.x, dot.y+translate.y) 
        ctx.closePath();
        ctx.stroke();
    }
};

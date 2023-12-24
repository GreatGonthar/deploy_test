const WIDTH = 340;
const HEIGHT = 600;


export const drawBorder = (ctx, mapSize, translate) => {      
    ctx.beginPath();
    ctx.setLineDash([3, 8])
    ctx.lineWidth = 2
    ctx.strokeStyle = "blue";
    ctx.rect(translate.x , translate.y , mapSize, mapSize);
    ctx.stroke();   
}
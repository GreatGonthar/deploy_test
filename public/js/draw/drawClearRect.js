export const drawClearRect = (ctx, background, WIDTH, HEIGHT, translate) => {

    let imgSize = 600
    let slowTranslate = {}
        slowTranslate.x = translate.x/2
        slowTranslate.y = translate.y/2
        let correctionX =  Math.trunc(slowTranslate.x / imgSize)
        let correctionY =  Math.trunc(slowTranslate.y / imgSize)
        
        ctx.clearRect(0, 0, imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x - imgSize)-(imgSize*correctionX), (slowTranslate.y - imgSize)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x)-(imgSize*correctionX), (slowTranslate.y - imgSize)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x + imgSize)-(imgSize*correctionX), (slowTranslate.y - imgSize)-(imgSize*correctionY), imgSize, imgSize);

    // ctx.drawImage(background, (slowTranslate.x - imgSize)-(imgSize*correctionX), (slowTranslate.y)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x)-(imgSize*correctionX), (slowTranslate.y)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x + imgSize)-(imgSize*correctionX), (slowTranslate.y)-(imgSize*correctionY), imgSize, imgSize);
    
    // ctx.drawImage(background, (slowTranslate.x - imgSize)-(imgSize*correctionX), (slowTranslate.y + imgSize)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x)-(imgSize*correctionX), (slowTranslate.y + imgSize)-(imgSize*correctionY), imgSize, imgSize);
    // ctx.drawImage(background, (slowTranslate.x + imgSize)-(imgSize*correctionX), (slowTranslate.y + imgSize)-(imgSize*correctionY), imgSize, imgSize);
    
};

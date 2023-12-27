export const dotCollision = (player, dots, socket, WIDTH, HEIGHT) => {
    if (Object.keys(dots).length > 0) {
        for (let id in dots) {
            let dot = dots[id];
            let myHypot = Math.hypot(dot.x - player.x, dot.y - player.y);
            if (myHypot < player.r) {
                // if (+id % 10 > 1 && player.r < 250) {
                //     player.r += 1;
                // } else {
                //     player.r -= 2;
                // }                
                dots[id].r = 1;
                dots[id].x = Math.random() * WIDTH * 2;
                dots[id].y = Math.random() * HEIGHT * 2;
                socket.emit("dellDot", id);
            }
        }
    }
};

class Dot {
    constructor(id, x, y, r = 5) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
let dotId = 0;
module.exports.createDots = (r, n, mapSize) => {
    dots = {};
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * mapSize);
        let y = Math.floor(Math.random() * mapSize);

        let id = dotId++;
        let dot = new Dot(id, x, y, r);
        dots[id] = dot;
    }
    return dots;
}

module.exports.dellPlayer = (slavePlayer, masterPlayer, mapSize) => {
    slavePlayer.r = 10;
    masterPlayer.r += 10;
    slavePlayer.x = Math.floor(Math.random() * mapSize);
    slavePlayer.y = Math.floor(Math.random() * mapSize);
    slavePlayer.tx = slavePlayer.x;
    slavePlayer.ty = slavePlayer.y;
}

module.exports.dellDot = (dots, id, player, mapSize, io) => {
    if (+id || +id === 0) {
        dots[id].x = Math.floor(Math.random() * mapSize);
        dots[id].y = Math.floor(Math.random() * mapSize);
        io.emit("newCordsDot", dots[id]);
        if (+id % 10 > 1 && player.r < 250) {
            player.r += 1;
        } else {
            player.r -= 2;
        }
    }
}


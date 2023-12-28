let dotsSkins = ['🔪','✂️','🍰','🍒','🍎','🍌','🍓','🥕','🍺','🍩']

class Dot {
    constructor(id, x, y, r = 10, skin) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.skin = skin;
    }
}
let dotId = 0;
module.exports.createDots = (r, n, mapSize) => {
    dots = {};
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * mapSize);
        let y = Math.floor(Math.random() * mapSize);
        let id = dotId++;
        let skin = dotsSkins[id % 10]
        let dot = new Dot(id, x, y, r, skin);
        dots[id] = dot;
    }
    return dots;
}

module.exports.dellDot = (dots, id, player, mapSize, io) => {
    if (+id || +id === 0) {
        dots[id].x = Math.floor(Math.random() * mapSize);
        dots[id].y = Math.floor(Math.random() * mapSize);
        if (+id % 10 > 1 && player.r < 250) {
            player.r += 1;
        } else {
            player.r -= 2;
        }
        io.sockets.emit("newCordsDot", dots[id]);
    }
}


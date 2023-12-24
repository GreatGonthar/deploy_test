class Player {
    constructor(props) {
        this.id = props.id;
        this.color = props.color;
        this.r = props.r;
        this.x = props.x;
        this.y = props.y;
        this.tx = props.x;
        this.ty = props.y;
        this.sin = 0;
        this.cos = 0;
        this.velocity = props.velocity;
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

module.exports.getPlayer = (players, socket, initialSpeed, WIDTH, HEIGHT) => {
    players[socket.id] = new Player({
        id: socket.id,
        r: 10,
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        color: getRandomColor(),
        velocity: initialSpeed,
    });
};

module.exports.dellPlayer = (slavePlayer, masterPlayer, mapSize) => {
    slavePlayer.r = 10;
    masterPlayer.r += 10;
    slavePlayer.x = Math.floor(Math.random() * mapSize);
    slavePlayer.y = Math.floor(Math.random() * mapSize);
    slavePlayer.tx = slavePlayer.x;
    slavePlayer.ty = slavePlayer.y;
}

module.exports.playerMove = (players, initialSpeed)=>{
    for (let id in players) {
        let player = players[id];
        let myHypot = Math.hypot(player.tx - player.x, player.ty - player.y);
        player.velocity = (initialSpeed / player.r) * 10;       
        if (myHypot > player.velocity) {
            player.x -= player.cos * player.velocity;
            player.y -= player.sin * player.velocity;
        }
    }
}
module.exports.getPlayerSinCos = (touchCords, player) => {
    let myHypot = Math.hypot(
        touchCords.x - player.x,
        touchCords.y - player.y
    );
    player.tx = touchCords.x;
    player.ty = touchCords.y;

    player.sin = (player.y - touchCords.y) / myHypot;
    player.cos = (player.x - touchCords.x) / myHypot;
}


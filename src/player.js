class Player {
    constructor(props) {
        this.id = props.id;
        this.name = '';
        this.skin = props.skin;
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

function getRandomSkin() {
    let skin = ['😀','😁','😅','🥹','😘','😋','😎','😔','😖','🥺','😮','😠','🥶','😱','🤗','🤔','😑','😬','🤢','🤤']
    return skin[Math.floor(Math.random() * skin.length)]    
}

module.exports.getPlayer = (players, socket, initialSpeed, WIDTH, HEIGHT) => {
    players[socket.id] = new Player({
        id: socket.id,
        r: 10,
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
        skin: getRandomSkin(),
        velocity: initialSpeed,
    });
};

module.exports.dellPlayer = (ID, players, socket, newR) => { 
    players[ID].x = Math.random() * 600 * 2;
    players[ID].y = Math.random() * 600 * 2;
    players[ID].tx = players[ID].x
    players[ID].ty = players[ID].y
    players[socket.id].r = newR
    console.log("collision", ID)
    socket.emit("main loop", players)
}

module.exports.playerMove = (players)=>{
    for (let id in players) {
        let player = players[id];
        let myHypot = Math.hypot(player.tx - player.x, player.ty - player.y);
        let speed = (player.velocity / player.r) * 10;       
        if (myHypot > player.velocity) {
            player.x -= player.cos * speed;
            player.y -= player.sin * speed;
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


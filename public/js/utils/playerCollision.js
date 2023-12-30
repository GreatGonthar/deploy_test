export const playerCollision = (myPlayer, players, socket) => {
    let flag = false
    for(let ID in players ){  
    let otherPlayer = players[ID]; 
    let distance = Math.sqrt(
        (otherPlayer.x - myPlayer.x) ** 2 +
            (otherPlayer.y - myPlayer.y) ** 2
            );    
            if (
                distance < myPlayer.r  && otherPlayer.r < myPlayer.r/2 && !flag
                ) {                 
                    let newR = myPlayer.r + 10
                console.log("client collision", ID)                   
                socket.emit("dellPlayer", {ID, newR});
                flag = true
    }
}
};

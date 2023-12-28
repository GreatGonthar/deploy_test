export const playerCollision = (myPlayer, players, socket) => {
    
    for(let ID in players ){  
    let otherPlayer = players[ID]; 
    const distance = Math.sqrt(
        (otherPlayer.x - myPlayer.x) ** 2 +
            (otherPlayer.y - myPlayer.y) ** 2
            );    
            if (
                distance < myPlayer.r &&
                distance > 0 &&
                otherPlayer.r < myPlayer.r / 2
                ) {   
                let myPlayerId = myPlayer.id 
                let otherPlayerId = otherPlayer.id  
                otherPlayer.r = 10
                otherPlayer.x = Math.random() * 1000 * 2;
                otherPlayer.y = Math.random() * 1000 * 2;              
        socket.emit("dellPlayer", {myPlayerId, otherPlayerId});
    }
}
};
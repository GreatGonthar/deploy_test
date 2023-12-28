export const playerCollision = (myPlayer, players, socket) => {
    
    for(let id in players ){  
    let otherPlayer = players[id]; 
    const distance = Math.sqrt(
        (otherPlayer.x - myPlayer.x) ** 2 +
            (otherPlayer.y - myPlayer.y) ** 2
    );    
    if (
        distance < myPlayer.r &&
        distance > 0 &&
        otherPlayer.r < myPlayer.r / 2
    ) {
       
        // otherPlayer.r = 10;
        // myPlayer.r += 10 
        otherPlayer.x = myPlayer.x + myPlayer.r*4
        otherPlayer.y = myPlayer.y + myPlayer.r*4
        let myPlayerId = myPlayer.id 
        let otherPlayerId = otherPlayer.id      
        socket.emit("dellPlayer", {myPlayerId, otherPlayerId});
    }
}
};
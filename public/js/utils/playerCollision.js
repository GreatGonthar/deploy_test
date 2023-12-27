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
        let myPlayerId = myPlayer.id      
        socket.emit("dellPlayer", {id, myPlayerId});
    }
}
};
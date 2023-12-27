export const drawNavigateText = (
    navigateTextArea,   
    players,
    id,
    playerName = "0",
    ping
) => {
    let player = players[id];
    let name = playerName;
    let cords = {
        x: Math.floor(player.x),
        y: Math.floor(player.y),
    };
    navigateTextArea.innerText = `name: ${name}, players: ${Object.keys(players).length}, velocity: ${player.velocity.toFixed(2)}, 
    r: ${player.r.toFixed(2)}, ping: ${ping}, x: ${cords.x}, y: ${cords.y}`;   
};

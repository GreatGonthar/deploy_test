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
    let speed = ((player.velocity / player.r) * 10).toFixed(2);       
    navigateTextArea.innerText = `name: ${name}, players: ${Object.keys(players).length}, speed: ${speed}, 
    r: ${player.r.toFixed(2)}, ping: ${ping}, x: ${cords.x}, y: ${cords.y}`;   
};

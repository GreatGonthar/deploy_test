let form = document.getElementById("form");
let responseButton = document.getElementById("response");
const selectElement = document.getElementById("select");

let dotsInput = document.getElementById("dots");
let mapSizeInput = document.getElementById("mapSize");
let velocityInput = document.getElementById("velocity");

let loader = document.getElementById("loader");
let playerName = document.getElementById("player-name");
let inputPlayerName = document.getElementById("input-player-name");
let startButton = document.getElementById("start-button");

export const getFormData = (players, dots, socket) => {
    if (Object.keys(players).length === 1 && Object.keys(dots).length <= 0) {
        playerName.style.display = "none";
        form.style.display = "flex";
        loader.style.display = "none";
        dotsInput.value = 1000;
        mapSizeInput.value = 2000;
        velocityInput.value = 3;

        responseButton.onclick = () => {
            let formData = {
                background: selectElement.value,
                dotsNum: +dotsInput.value,
                mapSize: +mapSizeInput.value,
                initialSpeed: +velocityInput.value               
            };
            socket.emit("form data", formData);
            form.style.display = "none";
        };
    }
    if (Object.keys(dots).length > 0) {
        playerName.style.display = "flex";
        form.style.display = "none";
        loader.style.display = "none";
        startButton.onclick = () => {
            let str = inputPlayerName.value.toUpperCase();
            if (str.length > 8) {
                str = str.substring(0, 6) + "...";
            }
            socket.emit("player name", str);
            playerName.style.display = "none";
        };
    }
    if (Object.keys(players).length > 1 && Object.keys(dots).length <= 0) {
        playerName.style.display = "none";
        form.style.display = "none";
        loader.style.display = "flex";
    }
};

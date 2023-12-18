let form = document.getElementById("form");
let startButton = document.getElementById("start_game");
let dotsInput = document.getElementById("dots");
let mapSizeInput = document.getElementById("mapSize");
let velocityInput = document.getElementById("velocity");
let FPSInput = document.getElementById("FPS");

export const getFormData = (players, socket) => {
    if (Object.keys(players).length === 1) {     
        dotsInput.value = 1000
        mapSizeInput.value = 2000
        velocityInput.value = 1
        FPSInput.value = 60
    }else {        
        form.style.display = "none"
    }
    startButton.onclick = () => {
        let formData = {
            dotsNum: +dotsInput.value,
            mapSize: +mapSizeInput.value,
            initialSpeed: +velocityInput.value,
            FPSform: +FPSInput.value,
        };           
        socket.emit("form data", formData);
        form.style.display = "none"
    };
};

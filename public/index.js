const socket = io();

const myButton = document.getElementById("button")
const text = document.getElementById("time")
myButton.onclick = ()=>{
 let now = +new Date();
  // setTimeout(()=>socket.emit("date", now), 1000)
  socket.emit("date", now)
  
}
socket.on("return now from server", data => {
  let newNow = +new Date();
  let answer = newNow - data
  console.log("data", data)
  console.log("now", newNow)
  console.log("answer", answer)
  time.innerText = `${answer}`
})
const reloadUsers = (data) => {
  for (let i =0; i<data.length; i++){
      const hallo = document.createElement("div")
      hallo.innerText = `id игрока: ${data[i].id} игрок: ${data[i].count}`
      document.body.appendChild(hallo)
  }
}
socket.emit("new player")
socket.on("state", (data)=> {
  reloadUsers(data)
})


/* global io */
const socket = io();

/* global document */
const text = document.getElementById("text");
const MessageToServer = document.getElementById("MessageToServer");

MessageToServer.addEventListener("click", () => {
    socket.emit("server", "¡Hola, servidor! 😉");
});

socket.on("welcome", (data) => {
    console.log(data);
    text.textContent = data;
});

socket.on("user-connected", (data) => {
    console.log(data);
});
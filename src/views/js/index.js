/* global io */
const socket = io();

/* global document */
const text = document.getElementById('text');
const messageToServer = document.getElementById('MessageToServer');
const emitToLast = document.getElementById('emit-to-last');

messageToServer.addEventListener('click', () => {
    socket.emit('greeting server', '¡Hola, servidor! 😉');
});

socket.on('welcome', (data) => {
    console.log(data);
    text.textContent = data;
});

socket.on('user-connected', (data) => {
    console.log(data);
});

emitToLast.addEventListener('click', () => {
    socket.emit('greetingToLast', '¡Hola, último cliente! 👋');
});

socket.on('salute', (data) => {
    console.log(data);
});

//on, once, off
socket.on('on', () => {
    console.log('Se emite varias veces');
});

socket.once('once', () => {
    console.log('Se emite una sola vez');
});

socket.off('off', () => {
    console.log('Se desactiva la emisión');
});
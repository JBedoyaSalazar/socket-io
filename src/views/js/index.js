/* global io */
const socket = io();

/* global document */
const connectRoomOne = document.getElementById('connectRoomOne');
const connectRoomTwo = document.getElementById('connectRoomTwo');
const connectRoomThree = document.getElementById('connectRoomThree');

connectRoomOne.addEventListener('click', () => {
    socket.emit('joinRoom', 'room1');
});

connectRoomTwo.addEventListener('click', () => {
    socket.emit('joinRoom', 'room2');
});

connectRoomThree.addEventListener('click', () => {
    socket.emit('joinRoom', 'room3');
});


// Enviar Mensje
const sendMessageButton = document.getElementById('sendMessage');
sendMessageButton.addEventListener('click', () => {
    /* global prompt */
    const message = prompt('Ingrese su mensaje:');
    socket.emit("UserMessage", message);
})

socket.on('sendMessage', (data) => {
    const li = document.createElement('li');
    li.textContent = `Mensaje de ${data.user}: ${data.text}`;
    document.getElementById(data.room).appendChild(li);
});

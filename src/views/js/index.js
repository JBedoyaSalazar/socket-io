/* global io */
const socket = io();
/* global document */

const sendToAllConnectedUsersButton = document.getElementById('sendToAllConnectedUsers');
const disconnectButton = document.getElementById('disconnect');
const reconnectButton = document.getElementById('reconnect');

sendToAllConnectedUsersButton.addEventListener('click', () => {
    if (socket.connected) {
        socket.emit('isConected', { message: 'Hello from the client!' });
    }
});

disconnectButton.addEventListener('click', () => {
    socket.disconnect();
    console.log('I lost my connection to the server');
});

reconnectButton.addEventListener('click', () => {
    socket.connect();
    console.log('Reconnected to the server');
});
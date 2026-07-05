/* global io */
const socket = io({
    auth: {
        token: 'Mr. Bowling'
    }
});

// Error de autenticacion: 
socket.on('connect_error', (err) => {
    console.log(err.message);
});
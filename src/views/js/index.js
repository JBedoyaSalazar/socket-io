const socket = io();

function checkSocketStatus(){
    console.log(`Estado del socket: ${socket.connected ? 'Conectado' : 'Desconectado'}`);
}

socket.on('connect', () => {
    console.log(`Cliente conectado: ${socket.id}`);
    checkSocketStatus();
});

socket.on('connect_error', (error) => {
    console.error(`
        No pude Reconectarme
        Error en el socket: ${error}
        `);
    checkSocketStatus();
});

socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    checkSocketStatus();
})

// socket.io.on('reconnect_attempt', () => {
//     console.log('Intentando reconectar...');
// });

socket.io.on('reconnect_attempt', (attempt) => {
    console.log('Intentando reconectar...', attempt);
});

socket.io.on('reconnect', (attempt) => {
    console.log('Reconectado con éxito!', attempt);
});


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'views')));

const socketsOnline = [];

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', (socket) => {
    socketsOnline.push(socket.id);

    //Emision Basica
    socket.emit('welcome', 'Bienvenido al servidor!');

    socket.on('greeting server', (data) => {
        console.log(data);
    });

    //Emision a todos los clientes
    io.emit('user-connected', `Un nuevo usuario se ha conectado! ${socket.id}`);

    //Emision a un solo cliente
    socket.on('greetingToLast', (data) => {
        const lastSocketId = socketsOnline[socketsOnline.length - 1];
        console.log(data);
        io.to(lastSocketId).emit('salute', data);
    });

    socket.on('disconnect', () => {
        const index = socketsOnline.indexOf(socket.id);
        if (index > -1) {
            socketsOnline.splice(index, 1);
        }
        console.log(`El usuario ${socket.id} se ha desconectado`);
    });

    //on
    socket.emit('on', 'Se emite varias veces');
    socket.emit('on', 'Se emite varias veces');
    socket.emit('on', 'Se emite varias veces');
    //once
    socket.emit('once', 'Se emite una sola vez');
    socket.emit('once', 'Se emite una sola vez');
    //off
    socket.emit('off', 'No se emite nada, ya que se desactiva la emisión 😒');
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

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

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', (socket) => {
    //Emision Basica
    socket.emit('welcome', 'Bienvenido al servidor!');

    socket.on('server', (data) => {
        console.log(data);
    });

    //Emision a todos los clientes
    io.emit('user-connected', `Un nuevo usuario se ha conectado! ${socket.id}`);
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
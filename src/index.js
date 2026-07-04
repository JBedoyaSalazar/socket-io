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
    socket.connectedRoom = '';

    socket.on('joinRoom', (room) => {
        switch (room) {
            case 'room1':
                socket.join(room);
                socket.connectedRoom = room;
                console.log(`Client ${socket.id} joined ${room}`);
                break;
            case 'room2':
                socket.join(room);
                socket.connectedRoom = room;
                console.log(`Client ${socket.id} joined ${room}`);
                break;
            case 'room3':
                socket.join(room);
                socket.connectedRoom = room;
                console.log(`Client ${socket.id} joined ${room}`);
                break;
            default:
                console.log(`Client ${socket.id} attempted to join invalid room`);
        }
    });

    socket.on('UserMessage', (message) => {
        if (socket.connectedRoom) {
            console.log(`Message from ${socket.id} in ${socket.connectedRoom}: ${message}`);
            io.to(socket.connectedRoom).emit('sendMessage', { user: socket.id, text: message, room: socket.connectedRoom });
        } else {
            console.log(`Client ${socket.id} attempted to send message without joining a room`);
        }
    });
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

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

//Middleware de autenticación para Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    if (token === 'Mr. Bowling') {
        next();
    }

    return next(new Error('Invalid token'));
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
}); 
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { instrument } from '@socket.io/admin-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['https://admin.socket.io'],
        credentials: true
    }
});

instrument(io, {
    auth: {
        type: 'basic',
        username: 'admin',
        password: '$2a$12$loos9v3WR89uQPGu88CBO.UPTT0m/AlsIBx9AcV.hsRdNEKAxdoCO'
    }
})

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//Middleware de autenticación para Socket.IO
io.on('connection', (socket) => {
    socket.on('circle-position', (position) => {
        socket.broadcast.emit('move-circle', position);
    });
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

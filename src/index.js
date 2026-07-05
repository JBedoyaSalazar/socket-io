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

const teachers = io.of('/teachers');
const students = io.of('/students');

teachers.on('connection', (socket) => {
    console.log(`Profesor conectado ${socket.id}`);

    socket.on('sendMessage', (data) => {
        teachers.emit('newMessage', data);
    })
});

students.on('connection', (socket) => {
    console.log(`Estudiante conectado ${socket.id}`);

    socket.on('sendMessage', (data) => {
        students.emit('newMessage', data);
    })
});

httpServer.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});

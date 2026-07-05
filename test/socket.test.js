const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

/*global describe, beforeAll, afterAll, test, expect */
describe('Socket.IO', () => {
    let io, serverSocket, clientSocket;

    beforeAll((_done) => {
        const httpServer = createServer();
        io = new Server(httpServer);

        httpServer.listen(() => {
            const port = httpServer.address().port;
            const url = `http://localhost:${port}`;
            clientSocket = new Client(url);

            io.on('connection', (socket) => {
                serverSocket = socket;
            });

            clientSocket.on('connect', _done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test('Test event', (done) => {
        try {
            clientSocket.on('greeting', (greeting) => {
                expect(greeting).toBe('Hello, Socket.IO!');
                done();
            });
        } catch (error) {
            done(error);
        }

        serverSocket.emit('greeting', 'Hello, Socket.IO!');
    });

    test('Testing callbacks', (done) => {

        serverSocket.on("bark", (callback) => {
            callback("woof!")
        })

        clientSocket.emit("bark", (message) => {
            try {
                expect(message).toBe("woof!");
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

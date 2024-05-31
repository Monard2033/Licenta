// server.js
const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIo(httpServer);

    let messages = [];

    io.on('connection', (socket) => {
        console.log('New client connected');

        // Send existing messages to the new client
        socket.emit('initialMessages', messages);

        // Listen for new messages
        socket.on('message', (message) => {
            messages.push(message);
            io.emit('message', message); // Broadcast the message to all clients
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server running on http://localhost:${PORT}/main`);
    });
});

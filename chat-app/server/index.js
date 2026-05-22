import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('message', ({ from, message }) => {
    socket.broadcast.emit('message', { from, message });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

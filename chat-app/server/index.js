import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import chat from './data/chat.json' with { type: 'json' };

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

app.get('/healthcheck', (req, res) => res.send('Server is running'));

io.on('connection', (socket) => {
  socket.emit('history', chat);

  socket.on('message', (msg) => {
    chat.push(msg);
    socket.broadcast.emit('message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

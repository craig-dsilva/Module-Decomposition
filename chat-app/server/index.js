import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import chat from './data/chat.json' with { type: 'json' };

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const socketChat = [...chat];
const pollChat = [...chat];

let lastMessageIndex = 0;
const pollClients = [];

app.use(cors());

app.get('/healthcheck', (req, res) => res.send('Server is running'));

app.get('/history', (req, res) => {
  res.json(pollChat);
});

app.get('/poll', (req, res) => {
  const clientLastIndex = parseInt(req.query.lastIndex) || 0;

  if (pollChat.length > clientLastIndex) {
    return res.json({
      messages: pollChat.slice(clientLastIndex),
      lastIndex: pollChat.length,
    });
  }

  const timeoutId = setTimeout(() => {
    const index = pollClients.indexOf(timeoutId);
    if (index > -1) {
      pollClients.splice(index, 1);
    }
    res.json({
      messages: [],
      lastIndex: pollChat.length,
    });
  }, 30000);

  pollClients.push(timeoutId);

  res.on('close', () => {
    const index = pollClients.indexOf(timeoutId);
    if (index > -1) {
      pollClients.splice(index, 1);
      clearTimeout(timeoutId);
    }
  });
});

app.post('/message', express.json(), (req, res) => {
  const msg = req.body;
  pollChat.push(msg);

  pollClients.forEach((timeoutId) => clearTimeout(timeoutId));
  pollClients.length = 0;
  io.emit('message', msg);

  res.json({ success: true });
});

io.on('connection', (socket) => {
  socket.emit('history', socketChat);

  socket.on('message', (msg) => {
    socketChat.push(msg);
    socket.broadcast.emit('message', msg);

    pollClients.forEach((timeoutId) => clearTimeout(timeoutId));
    pollClients.length = 0;
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

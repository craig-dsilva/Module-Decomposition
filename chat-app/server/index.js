import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import chat from './data/chat.json' with { type: 'json' };

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const pollStore = JSON.parse(JSON.stringify(chat));
const socketStore = JSON.parse(JSON.stringify(chat));

app.get('/status', (req, res) => res.status(200).send('Server is running'));

app.get('/poll/history', (req, res) => {
  res.json(pollStore);
});

app.post('/poll/message', (req, res) => {
  const msg = req.body;
  pollStore.push(msg);
  res.sendStatus(200);
});

app.patch('/poll/message/:index', (req, res) => {
  const msg = pollStore[req.params.index];
  const type = req.query.type;
  if (!msg) return res.sendStatus(404);
  msg[type]++;
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  socket.emit(
    'history',
    socketStore.map((msg, index) => ({ ...msg, index })),
  );

  socket.on('message', (msg) => {
    socketStore.push(msg);
    socket.broadcast.emit('message', { ...msg, self: false });
  });

  socket.on('react', ({ index, type }) => {
    const msg = socketStore[index];
    if (!msg) return;
    msg[type]++;
    socket.broadcast.emit('react', { index, type, value: msg[type] });
  });
});

httpServer.listen(3000, () => console.log('Server running on port: 3000'));

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

const pollStore = { messages: JSON.parse(JSON.stringify(chat)), clients: [] };
const socketStore = { messages: JSON.parse(JSON.stringify(chat)) };

app.get('/poll/history', (req, res) => {
  res.json(pollStore.messages);
});

app.get('/poll', (req, res) => {
  const since = parseInt(req.query.since) || 0;
  const newMessages = pollStore.messages.filter((_, i) => i >= since);

  if (newMessages.length > 0) {
    return res.json({
      messages: newMessages,
      cursor: pollStore.messages.length,
    });
  }

  pollStore.clients.push({ res });

  req.on('close', () => {
    const i = pollStore.clients.findIndex((c) => c.res === res);
    if (i !== -1) pollStore.clients.splice(i, 1);
  });

  setTimeout(() => {
    const i = pollStore.clients.findIndex((c) => c.res === res);
    if (i !== -1) {
      pollStore.clients.splice(i, 1);
      res.json({ messages: [], cursor: since });
    }
  }, 30000);
});

app.post('/poll/message', (req, res) => {
  const msg = req.body;
  pollStore.messages.push(msg);
  pollStore.clients.forEach(({ res }) =>
    res.json({ messages: [msg], cursor: pollStore.messages.length }),
  );
  pollStore.clients.length = 0;
  res.sendStatus(200);
});

app.patch('/poll/message/:index/likes', (req, res) => {
  console.log('http poll');
  const msg = pollStore.messages[req.params.index];
  if (!msg) return res.sendStatus(404);
  msg.likes++;
  pollStore.clients.forEach(({ res }) =>
    res.json({
      messages: [{ ...msg, index: Number(req.params.index) }],
      cursor: pollStore.messages.length,
    }),
  );
  pollStore.clients.length = 0;
  res.sendStatus(200);
});

app.patch('/poll/message/:index/dislikes', (req, res) => {
  const msg = pollStore.messages[req.params.index];
  if (!msg) return res.sendStatus(404);
  msg.dislikes++;
  pollStore.clients.forEach(({ res }) =>
    res.json({
      messages: [{ ...msg, index: Number(req.params.index) }],
      cursor: pollStore.messages.length,
    }),
  );
  pollStore.clients.length = 0;
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  socket.emit(
    'history',
    socketStore.messages.map((msg, index) => ({ ...msg, index })),
  );

  socket.on('message', (msg) => {
    socketStore.messages.push(msg);
    socket.broadcast.emit('message', { ...msg, self: false });
  });

  socket.on('react', ({ index, type }) => {
    console.log('ws');
    const msg = socketStore.messages[index];
    if (!msg) return;
    msg[type]++;
    socket.broadcast.emit('react', { index, type, value: msg[type] });
  });
});

httpServer.listen(3000, () => console.log('Server running on port: 3000'));

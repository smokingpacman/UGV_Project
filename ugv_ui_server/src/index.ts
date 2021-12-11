import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = 8000;

io.on('connection', () => {
  console.log('Connection confirmed');
});

httpServer.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

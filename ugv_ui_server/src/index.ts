import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addChannelRegisterAsUi, initialJoin } from 'src/register';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = 8000;

io.on('connection', (socket) => {
  initialJoin(socket);
  addChannelRegisterAsUi(socket);
});

httpServer.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

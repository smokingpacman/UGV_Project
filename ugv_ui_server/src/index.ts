import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  addChannelRegisterAsRPI,
  addChannelRegisterAsUI,
  addInitialJoinEvent,
} from 'src/register';
import { addChannelSendCommand } from 'src/ui_sockets/register';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = 8000;

io.on('connection', (socket) => {
  addInitialJoinEvent(socket);
  addChannelRegisterAsRPI(socket, () => {
    // Do nothing yet
  });
  addChannelRegisterAsUI(socket, () => {
    addChannelSendCommand(socket);
  });
});

httpServer.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

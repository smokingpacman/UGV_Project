import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  addChannelRegisterAsRPI,
  addChannelRegisterAsUI,
  onLeaveEvent,
  onJoinEvent,
} from 'src/register';
import { addChannelRPIInfo } from 'src/rpi_sockets/register';
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
  onJoinEvent(socket);
  addChannelRegisterAsRPI(socket, () => {
    addChannelRPIInfo(socket);
  });
  addChannelRegisterAsUI(socket, () => {
    addChannelSendCommand(socket);
  });
});

io.on('disonnection', (socket) => {
  onLeaveEvent(socket);
});

httpServer.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

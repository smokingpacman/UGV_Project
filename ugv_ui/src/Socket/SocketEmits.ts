import { Socket } from 'socket.io-client';

export function sendCommand(socket: Socket, command: string) {
  socket.emit('command_line', command);
}

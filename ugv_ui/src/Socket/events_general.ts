import type { Socket } from 'socket.io-client';

export function addGeneralEvents(socket: Socket) {
  socket.on('connect', () => {
    console.log('Connection established');
  });

  socket.on('disconnect', () => {
    console.log('Connection lost');
  });
}

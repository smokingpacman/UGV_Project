import type { Socket } from 'socket.io';
import { SocketMessage, SeverityLevel } from 'src/shared/types';

export function addChannelSendCommand(socket: Socket) {
  socket.on('command_line_sender', (data: string) => {
    socket.emit('info_channel', {
      message: 'Received command line, sending it to the receiver!',
      severityLevel: SeverityLevel.ERROR,
    } as SocketMessage);
    socket.emit('command_line_receiver', data);
  });
}

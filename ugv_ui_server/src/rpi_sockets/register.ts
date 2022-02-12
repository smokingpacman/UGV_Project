import type { Socket } from 'socket.io';
import { SocketMessage, SeverityLevel } from 'src/shared/types';

export function addChannelRPIInfo(socket: Socket) {
  socket.on('rpi_info', (data: string) => {
    socket.emit('info_channel', {
      message: 'Received command line, sending it to the receiver!',
      severityLevel: SeverityLevel.INFO,
    } as SocketMessage);
    socket.emit('info_channel', data);
  });
}

/**
 * Since sockets are purely informational. We need to make sure each socket connection registers
 * themselves before they can interface the with socket network.
 *
 * We are going to keep this simple and create a simple object register. Where the socket's UUID
 * corresponds to their type.
 */
import type { Socket } from 'socket.io';
import { SocketMessage, SocketType, SeverityLevel } from 'src/shared/types';

export const SocketRegister: Record<string, string> = {};

export function addInitialJoinEvent(socket: Socket) {
  SocketRegister[socket.id] = SocketType.UNKNOWN;
  socket.emit('info_channel', {
    message: 'Formed connection with UI server',
    severityLevel: SeverityLevel.INFO,
  } as SocketMessage);
}

const registerChannel =
  (type: SocketType) => (socket: Socket, onRegister: () => void) => {
    socket.on('register_ui', () => {
      if (!(socket.id in SocketRegister)) {
        socket.emit('info_channel', {
          message: 'You were unable to be registered by the server!',
          severityLevel: SeverityLevel.ERROR,
        } as SocketMessage);
        return;
      }

      const socketType = SocketRegister[socket.id];

      if (socketType !== SocketType.UNKNOWN) {
        socket.emit('info_channel', {
          message: `You are already registered as a ${socketType}!`,
          severityLevel: SeverityLevel.ERROR,
        } as SocketMessage);
        return;
      }

      SocketRegister[socket.id] = type;
      onRegister();
    });
  };

export const addChannelRegisterAsRPI = registerChannel(SocketType.RASPBERRY_PI);
export const addChannelRegisterAsUI = registerChannel(SocketType.UI);

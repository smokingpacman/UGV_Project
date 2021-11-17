import * as mobx from 'mobx';
import type { Socket } from 'socket.io-client';
import type { SocketManager } from 'src/Socket/SocketManager';
import { SeverityLevel, SocketMessage } from 'src/Shared/types';

export class SocketMessageChannel {
  messages: SocketMessage[] = [
    {
      message: 'Socket message channel booted up',
      severityLevel: SeverityLevel.SUCCESS,
    },
  ];
  socketManager: SocketManager;

  constructor(socketManager: SocketManager) {
    this.socketManager = socketManager;
    mobx.makeObservable(this, { messages: mobx.observable });

    const installEventReaction = mobx.reaction(
      () => this.socketManager.socket !== null,
      () => {
        const socket = this.socketManager.socket as Socket;
        socket.on('info_channel', (data: SocketMessage) => {
          console.log(data);
          if (!('message' in data) || !('severityLevel' in data)) {
            this.messages.push({
              message: 'Information channel received invalid data',
              severityLevel: SeverityLevel.WARNING,
            });
            return;
          }

          this.messages.push(data);
        });
        installEventReaction();
      }
    );
  }
}

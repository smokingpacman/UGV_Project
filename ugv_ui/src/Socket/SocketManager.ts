import * as mobx from 'mobx';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { SocketState } from 'src/Shared/types';

export class SocketManager {
  connectionState: SocketState = SocketState.NotConnected;
  socket: Socket | null = null;

  constructor() {
    mobx.makeObservable(this, {
      connectionState: mobx.observable,
    });
  }

  startConnection(socketUrl: string) {
    const socket = io(socketUrl);
    this.connectionState = SocketState.Connecting;

    socket.on('connect', () => {
      this.connectionState = SocketState.Connected;
    });

    socket.on('connect_error', () => {
      this.connectionState = SocketState.ConnectionError;
    });

    socket.on('disconnect', () => {
      this.connectionState = SocketState.NotConnected;
    });

    this.socket = socket;
  }

  emitTestRandom() {
    if (this.socket) {
      this.socket.emit('test_random');
    }
  }

  emitTestRotate() {
    if (this.socket) {
      this.socket.emit('test_rotate');
    }
  }

  emitTestCommand() {
    if (this.socket) {
      this.socket.emit('command_line', { command: 'test' });
    }
  }
}

import { Alert } from 'antd';
import * as React from 'react';
import { SocketState } from 'src/Shared/types';

interface SocketStatusProps {
  socketState: SocketState;
}

export function SocketStatus({ socketState }: SocketStatusProps) {
  if (socketState === SocketState.Connected) {
    return <Alert message="Connection Successful" type="success" showIcon />;
  } else if (socketState === SocketState.ConnectionError) {
    return <Alert message="Connection failed" type="error" showIcon />;
  }
  return <Alert message="No connection initiated" type="info" showIcon />;
}

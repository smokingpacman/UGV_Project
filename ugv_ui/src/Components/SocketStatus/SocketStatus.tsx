import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { SocketState } from 'src/Shared/types';

const loadIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

interface SocketStatusProps {
  socketState: SocketState;
}

export function SocketStatus({ socketState }: SocketStatusProps) {
  if (socketState === SocketState.Connected) {
    return <Alert message="Connection Successful" type="success" showIcon />;
  } else if (socketState === SocketState.ConnectionError) {
    return <Alert message="Connection failed" type="error" showIcon />;
  } else if (socketState === SocketState.Connecting) {
    return (
      <Alert
        message="Connecting ..."
        type="info"
        showIcon
        icon={
          <div>
            <Spin indicator={loadIcon} />
          </div>
        }
      />
    );
  }
  return <Alert message="No connection initiated" type="info" showIcon />;
}

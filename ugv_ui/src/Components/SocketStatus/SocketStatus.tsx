import { Alert, Spin } from 'antd';
import type { AlertProps } from 'antd/lib/alert';
import { LoadingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { SocketState } from 'src/Shared/types';

const loadIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

interface SocketStatusProps extends Omit<AlertProps, 'message'> {
  socketState: SocketState;
}

export function SocketStatus({
  socketState,
  ...alertProps
}: SocketStatusProps) {
  if (socketState === SocketState.Connected) {
    return (
      <Alert
        {...alertProps}
        message="Connection Successful"
        type="success"
        showIcon
      />
    );
  } else if (socketState === SocketState.ConnectionError) {
    return (
      <Alert
        {...alertProps}
        message="Connection failed"
        type="error"
        showIcon
      />
    );
  } else if (socketState === SocketState.Connecting) {
    return (
      <Alert
        {...alertProps}
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
  return (
    <Alert
      {...alertProps}
      message="No connection initiated"
      type="info"
      showIcon
    />
  );
}

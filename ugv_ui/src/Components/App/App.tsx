import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { LoadState, SocketState } from 'src/Shared/types';
import './App.scss';

interface AppProps {
  FormComponent: React.ComponentType;
  SocketStatusComponent: React.ComponentType;
  CommandListComponent: React.ComponentType;
  loadState: LoadState;
  socketState: SocketState;
}
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function App({
  FormComponent,
  SocketStatusComponent,
  CommandListComponent,
  loadState,
  socketState,
}: AppProps) {
  let DisplayElement = <FormComponent />;

  if (loadState === LoadState.Loading) {
    DisplayElement = (
      <div className="spinner">
        <Spin indicator={loadIcon} tip="Connecting to socket" />
      </div>
    );
  } else if (
    loadState === LoadState.Loaded &&
    socketState === SocketState.Connected
  ) {
    DisplayElement = <></>;
  }

  return (
    <div className="connection-wrapper">
      <div>{DisplayElement}</div>
      <div>
        <SocketStatusComponent />
      </div>
      <div>
        <CommandListComponent />
      </div>
    </div>
  );
}

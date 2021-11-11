import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { LoadState } from 'src/Shared/types';
import './App.scss';

interface AppProps {
  FormElement: React.ComponentType;
  SocketStatusElement: React.ComponentType;
  loadState: LoadState;
}
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function App({ FormElement, SocketStatusElement, loadState }: AppProps) {
  let DisplayElement = <FormElement />;

  if (loadState === LoadState.Loading) {
    DisplayElement = (
      <div className="spinner">
        <Spin indicator={loadIcon} tip="Connecting to socket" />
      </div>
    );
  }

  return (
    <div className="connection-wrapper">
      <div>{DisplayElement}</div>
      <div>
        <SocketStatusElement />
      </div>
    </div>
  );
}

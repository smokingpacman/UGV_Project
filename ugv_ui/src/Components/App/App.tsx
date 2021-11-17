import { Layout } from 'antd';
import React from 'react';
import { SocketState } from 'src/Shared/types';
import './App.scss';

const { Content } = Layout;

interface AppProps {
  FormComponent: React.ComponentType;
  SocketStatusComponent: React.ComponentType;
  CommandListComponent: React.ComponentType;
  socketState: SocketState;
}

export function App({
  FormComponent,
  SocketStatusComponent,
  CommandListComponent,
  socketState,
}: AppProps) {
  let DisplayElement = <FormComponent />;

  if (socketState === SocketState.Connected) {
    DisplayElement = <></>;
  }

  return (
    <Layout className="site-layout">
      <div className="status-wrapper">
        <SocketStatusComponent />
      </div>
      <Content style={{ margin: '0 16px' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <div className="connection-wrapper">
            <div>{DisplayElement}</div>
            <div>
              <CommandListComponent />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

import { Layout } from 'antd';
import React from 'react';
import './App.scss';

const { Content } = Layout;

interface AppProps {
  ConnectionModalComponent: React.ComponentType;
  SocketStatusComponent: React.ComponentType;
  InformationChannelComponent: React.ComponentType;
  CommandListComponent: React.ComponentType;
}

export function App({
  ConnectionModalComponent,
  SocketStatusComponent,
  InformationChannelComponent,
  CommandListComponent,
}: AppProps) {
  return (
    <>
      <ConnectionModalComponent />
      <Layout className="site-layout">
        <div className="status-wrapper">
          <SocketStatusComponent />
        </div>
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className="information-channel">
              <InformationChannelComponent />
            </div>
            <div>
              <CommandListComponent />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

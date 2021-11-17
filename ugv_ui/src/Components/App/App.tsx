import React from 'react';
import './App.scss';

interface AppProps {
  ConnectionModalComponent: React.ComponentType;
  SocketStatusComponent: React.ComponentType;
  InformationChannelComponent: React.ComponentType;
  CommandComponent: React.ComponentType;
}

export function App({
  ConnectionModalComponent,
  SocketStatusComponent,
  InformationChannelComponent,
  CommandComponent,
}: AppProps) {
  return (
    <>
      <ConnectionModalComponent />
      <div className="layout-wrapper">
        <div className="status-wrapper">
          <SocketStatusComponent />
        </div>
        <div className="content">
          <div className="information-channel">
            <InformationChannelComponent />
          </div>
          <div className="command-area">
            <CommandComponent />
          </div>
        </div>
      </div>
    </>
  );
}

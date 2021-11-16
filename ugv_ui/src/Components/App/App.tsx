import React from 'react';
import { SocketState } from 'src/Shared/types';
import './App.scss';

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

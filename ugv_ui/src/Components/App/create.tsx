import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { createConnectionForm } from 'src/Components/ConnectionForm/create';
import { SocketStatus } from '../SocketStatus/SocketStatus';
import { LoadState, SocketState } from 'src/Shared/types';
import { SocketManager } from 'src/Socket/SocketManager';
import { App } from './App';
import { AppState } from './AppState';

export function createApp() {
  const appState = new AppState();
  const socketManager = new SocketManager();
  const { ConnectionFormElement, connectionFormState } = createConnectionForm();

  const formSubmitReaction = mobx.autorun(() => {
    if (
      connectionFormState.socketUrl &&
      connectionFormState.socketUrl.length > 0
    ) {
      appState.loadingState = LoadState.Loading;
      socketManager.startConnection(connectionFormState.socketUrl);
    }
  });

  const socketReaction = mobx.autorun(() => {
    if (socketManager.connectionState === SocketState.ConnectionError) {
      appState.loadingState = LoadState.Loaded;
      connectionFormState.socketUrl = '';
    }
  });

  const SocketStatusElement = mobxReact.observer(() => (
    <SocketStatus socketState={socketManager.connectionState} />
  ));

  function cleanUpAppReactions() {
    console.log('Cleaning up');
    formSubmitReaction();
    socketReaction();
  }

  return {
    AppElement: mobxReact.observer(() => {
      React.useEffect(() => {
        return () => cleanUpAppReactions();
      }, []);

      return (
        <App
          FormElement={ConnectionFormElement}
          SocketStatusElement={SocketStatusElement}
          loadState={appState.loadingState}
        />
      );
    }),
    appState,
  };
}

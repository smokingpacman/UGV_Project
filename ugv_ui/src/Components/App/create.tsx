import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { CommandList } from 'src/Components/CommandList/CommandList';
import { createConnectionForm } from 'src/Components/ConnectionForm/create';
import { SocketStatus } from 'src/Components/SocketStatus/SocketStatus';
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

  const CommandListElement = mobxReact.observer(() => (
    <CommandList
      isDisabled={socketManager.connectionState !== SocketState.Connected}
      onClickRandom={onClickRandom}
      onClickRotate={onClickRotate}
    />
  ));

  function onClickRandom() {
    socketManager.emitTestRandom();
  }

  function onClickRotate() {
    socketManager.emitTestRotate();
  }

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
          FormComponent={ConnectionFormElement}
          SocketStatusComponent={SocketStatusElement}
          CommandListComponent={CommandListElement}
          loadState={appState.loadingState}
          socketState={socketManager.connectionState}
        />
      );
    }),
    appState,
  };
}

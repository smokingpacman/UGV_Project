import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { CommandList } from 'src/Components/CommandList/CommandList';
import { createConnectionForm } from 'src/Components/ConnectionForm/create';
import { createConnectionModal } from 'src/Components/ConnectionModal/create';
import { InfoStatusList } from 'src/Components/InfoStatus/InfoStatusList';
import { SocketStatus } from 'src/Components/SocketStatus/SocketStatus';
import { LoadState, SocketState } from 'src/Shared/types';
import { SocketManager } from 'src/Socket/SocketManager';
import { SocketMessageChannel } from 'src/Socket/SocketMessageChannel';
import { App } from './App';
import { AppState } from './AppState';

export function createApp() {
  const appState = new AppState();
  const socketManager = new SocketManager();
  const socketMessageChannel = new SocketMessageChannel(socketManager);

  /* =============== Components =============== */
  const { ConnectionFormElement, connectionFormState } = createConnectionForm();
  const InfoStatusListElement = mobxReact.observer(() =>
    // This is to ensure messages is observed.
    socketMessageChannel.messages.length ? (
      <InfoStatusList messages={socketMessageChannel.messages} />
    ) : (
      <InfoStatusList messages={[]} />
    )
  );
  const SocketStatusElement = mobxReact.observer(() => (
    <SocketStatus socketState={socketManager.connectionState} />
  ));
  const { ConnectionModalElement, connectionModalState } =
    createConnectionModal({
      ConnectionFormElement,
      SocketStatusElement,
    });
  const CommandListElement = mobxReact.observer(() => (
    <CommandList
      isDisabled={socketManager.connectionState !== SocketState.Connected}
      onClickCommandLine={() => socketManager.emitTestCommand()}
    />
  ));

  /* =============== Reactions =============== */
  const formSubmitReaction = mobx.autorun(() => {
    if (
      connectionFormState.socketUrl &&
      connectionFormState.socketUrl.length > 0
    ) {
      connectionModalState.loadState = LoadState.Loading;
      socketManager.startConnection(connectionFormState.socketUrl);
    }
  });

  const socketReaction = mobx.autorun(() => {
    if (socketManager.connectionState === SocketState.ConnectionError) {
      connectionModalState.loadState = LoadState.Loaded;
      connectionModalState.isModalVisible = true;
      connectionFormState.socketUrl = '';
    } else if (socketManager.connectionState === SocketState.Connected) {
      appState.loadingState = LoadState.Loaded;
      connectionModalState.isModalVisible = false;
    }
  });

  /* =============== Clean up =============== */
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
          ConnectionModalComponent={ConnectionModalElement}
          SocketStatusComponent={SocketStatusElement}
          InformationChannelComponent={InfoStatusListElement}
          CommandComponent={CommandListElement}
        />
      );
    }),
    appState,
  };
}

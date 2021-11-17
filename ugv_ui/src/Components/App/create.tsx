import { Button, Space } from 'antd';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { createCommandLine } from 'src/Components/CommandLine/create';
import { createConnectionForm } from 'src/Components/ConnectionForm/create';
import { createConnectionModal } from 'src/Components/ConnectionModal/create';
import { InfoStatusList } from 'src/Components/InfoStatus/InfoStatusList';
import { SocketStatus } from 'src/Components/SocketStatus/SocketStatus';
import { SocketState } from 'src/Shared/types';
import { sendCommand } from 'src/Socket/SocketEmits';
import { SocketManager } from 'src/Socket/SocketManager';
import { SocketMessageChannel } from 'src/Socket/SocketMessageChannel';
import { App } from './App';
import {
  startConnection,
  handleConnectionSuccess,
  resetConnection,
} from './AppActions';

export function createApp() {
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
    <SocketStatus
      socketState={socketManager.connectionState}
      action={
        socketManager.connectionState === SocketState.Connected ? (
          <Space>
            <Button size="small" type="ghost" onClick={toggleResetConnection}>
              Close Connection
            </Button>
          </Space>
        ) : null
      }
    />
  ));
  const { ConnectionModalElement, connectionModalState } =
    createConnectionModal({
      ConnectionFormElement,
      SocketStatusElement,
    });
  const { CommandLineElement, commandLineState } = createCommandLine({
    onSend: (command) => {
      socketManager.socket && sendCommand(socketManager.socket, command);
    },
  });

  /* =============== Actions =============== */
  function toggleResetConnection() {
    socketManager.closeConnection();
    resetConnection(connectionModalState, connectionFormState);
  }

  /* =============== Reactions =============== */
  const formSubmitReaction = mobx.autorun(() => {
    if (
      connectionFormState.socketUrl &&
      connectionFormState.socketUrl.length > 0
    ) {
      startConnection(connectionModalState);
      socketManager.startConnection(connectionFormState.socketUrl);
    }
  });

  const socketReaction = mobx.autorun(() => {
    commandLineState.setIsDisabled(
      socketManager.connectionState !== SocketState.Connected
    );
    if (socketManager.connectionState === SocketState.ConnectionError) {
      resetConnection(connectionModalState, connectionFormState);
    } else if (socketManager.connectionState === SocketState.Connected) {
      handleConnectionSuccess(connectionModalState);
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
          CommandComponent={CommandLineElement}
        />
      );
    }),
  };
}

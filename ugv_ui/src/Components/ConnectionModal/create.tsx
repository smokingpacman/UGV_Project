import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { ConnectionModal } from './ConnectionModal';
import { ConnectionModalState } from './ConnectionModal.state';

interface ConnectionModalParams {
  ConnectionFormElement: React.ComponentType;
  SocketStatusElement: React.ComponentType;
}

export function createConnectionModal({
  ConnectionFormElement,
  SocketStatusElement,
}: ConnectionModalParams) {
  const connectionModalState = new ConnectionModalState();

  return {
    ConnectionModalElement: mobxReact.observer(() => (
      <ConnectionModal
        ConnectionFormElement={ConnectionFormElement}
        SocketStatusElement={SocketStatusElement}
        isModalVisible={connectionModalState.isModalVisible}
        loadState={connectionModalState.loadState}
      />
    )),
    connectionModalState,
  };
}

import * as mobxReact from 'mobx-react-lite';
import * as React from 'react';
import { ConnectionForm } from './ConnectionForm';
import { ConnectionFormState } from './ConnectionForm.state';

export function createConnectionForm() {
  const connectionFormState = new ConnectionFormState();

  function saveSocketUrl(socketUrl: string) {
    connectionFormState.socketUrl = socketUrl;
  }

  return {
    ConnectionFormElement: mobxReact.observer(() => (
      <ConnectionForm saveSocketUrl={saveSocketUrl} />
    )),
    connectionFormState,
  };
}

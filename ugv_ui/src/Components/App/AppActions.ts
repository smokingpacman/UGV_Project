import * as mobx from 'mobx';
import type { ConnectionFormState } from 'src/Components/ConnectionForm/ConnectionForm.state';
import type { ConnectionModalState } from 'src/Components/ConnectionModal/ConnectionModal.state';
import { LoadState } from 'src/Shared/types';

export const startConnection = mobx.action(
  (connectionModalState: ConnectionModalState) => {
    connectionModalState.loadState = LoadState.Loading;
  }
);

export const resetConnection = mobx.action(
  (
    connectionModalState: ConnectionModalState,
    connectionFormState: ConnectionFormState
  ) => {
    connectionModalState.loadState = LoadState.Loaded;
    connectionModalState.isModalVisible = true;
    connectionFormState.socketUrl = '';
  }
);

export const handleConnectionSuccess = mobx.action(
  (connectionModalState: ConnectionModalState) => {
    connectionModalState.isModalVisible = false;
  }
);

import * as mobx from 'mobx';
import { LoadState } from 'src/Shared/types';

export class ConnectionModalState {
  isModalVisible = true;
  loadState = LoadState.Loaded;

  constructor() {
    mobx.makeObservable(this, {
      isModalVisible: mobx.observable,
      loadState: mobx.observable,
    });
  }
}

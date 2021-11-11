import * as mobx from 'mobx';
import { LoadState } from 'src/Shared/types';

export class AppState {
  loadingState: LoadState = LoadState.Loaded;

  constructor() {
    mobx.makeObservable(this, {
      loadingState: mobx.observable,
    });
  }
}

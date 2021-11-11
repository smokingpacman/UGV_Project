import * as mobx from 'mobx';

export class ConnectionFormState {
  socketUrl = '';

  constructor() {
    mobx.makeObservable(this, {
      socketUrl: mobx.observable,
    });
  }
}

export enum LoadState {
  Loading = 'Loading',
  Loaded = 'Loaded',
}

export enum SocketState {
  Connected = 'Connected',
  Connecting = 'Connecting',
  NotConnected = 'NotConnected',
  ConnectionError = 'ConnectionError',
}

/**
 * The number will determine how severe a message should be.
 * 0 being the least severe with 100 being the most severe.
 *
 * The enums are just predefined levels
 */
export enum InfoState {
  INFO = 0,
  WARNING = 25,
  ERROR = 50,
  CRITICAL_ERROR = 75,
}

export enum SocketType {
  RASPBERRY_PI = 'raspberry_pi',
  UI = 'ui',
  UNKNOWN = 'unknown',
}

/**
 * The number will determine how severe a message should be.
 * 0 being the least severe with 100 being the most severe.
 * Negative means it is a good sign
 *
 * The enums are just predefined levels
 */
export enum SeverityLevel {
  SUCCESS = -1,
  INFO = 0,
  WARNING = 25,
  ERROR = 50,
  CRITICAL_ERROR = 75,
}

export interface SocketMessage {
  message: string;
  severityLevel: SeverityLevel;
}

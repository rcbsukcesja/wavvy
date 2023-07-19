export const CALL_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;

export type CallState = keyof typeof CALL_STATE;

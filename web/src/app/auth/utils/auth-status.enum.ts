export const AUTH_STATUS = {
  AUTHENTICATED: 'AUTHENTICATED',
  NON_AUTHENTICATED: 'NON_AUTHENTICATED',
} as const;

export type AuthStatus = keyof typeof AUTH_STATUS;

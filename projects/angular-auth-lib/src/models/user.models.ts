export interface Token {
  token: string;
  expiringDate: Date;
}

export interface BaseUser {
  id: number;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  enterprise?: string | null;
  dateJoined: Date;
  redirectUrlAfterLogin: string;
  allowedUrls: string[];
  token?: Token;
  password?: string;
  isActivated: boolean;
}

/**
 * Extensible user record. Consumers may attach arbitrary additional attributes
 * returned by their backend; access them with explicit narrowing since the
 * index signature is `unknown` under strict mode.
 */
export interface User extends BaseUser {
  [attribute: string]: unknown;
}

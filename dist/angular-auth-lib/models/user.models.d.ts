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
    enterprise?: string;
    dateJoined: Date;
    redirectUrlAfterLogin: string;
    allowedUrls: string[];
    token?: Token;
    password?: string;
    isActivated: boolean;
}
export interface User extends BaseUser {
    [attribute: string]: any;
}

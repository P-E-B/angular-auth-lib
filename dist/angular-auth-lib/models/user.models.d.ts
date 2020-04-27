export interface Token {
    token: string;
    expiringDate: Date;
}
export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    enterprise: string;
    dateJoined: Date;
    redirectUrlAfterLogin: string;
    allowedUrls: string[];
    token?: Token;
    password?: string;
}

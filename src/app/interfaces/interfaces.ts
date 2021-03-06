export interface IDefaultProps {
    history?: string[]
}
export interface IDefaultState {}

export interface ICredential {
    username: string;
    password: string;
}

export enum USER_STATUS {
    ADMIN,
    MANAGER,
    EMPLOYER
}

export interface IUser extends ICredential{
    status: USER_STATUS
}

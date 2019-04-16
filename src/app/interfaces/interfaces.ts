export interface IDefaultProps {}
export interface IDefaultState {}

export interface ITask {
    id: number;
    description: string;
}

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

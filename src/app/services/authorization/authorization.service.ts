import {IAuthService} from "./authorization.interface";
import {ICredential, IUser, USER_STATUS} from "../../interfaces/interfaces";

export class AuthService implements IAuthService {
    private isAuthenticated: boolean = false;

    authenticate(credential: ICredential): Promise<any> {
        this.isAuthenticated = true;

        return new Promise((resolve, reject) => {
            const authUser: IUser = findUser(credential);

            if (authUser) {
                setTimeout(() => resolve(authUser), 1000);
            } else {
                setTimeout(() => reject({message: "Invalid username or password"}), 1000);
            }
        });
    };
    signout(): Promise<any> {
        const result: any = {isAuthenticated: false};

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result), 1000);
        });
    }
}

const users: IUser[] = [
    {username: 'Admin', password: 'Admin', status: USER_STATUS.MANAGER},
    {username: 'Manager', password: 'Manager', status: USER_STATUS.MANAGER},
    {username: 'Employee', password: 'Employee', status: USER_STATUS.EMPLOYER},
];

const findUser = (credential: ICredential): IUser => {
    return users.find<IUser>((dbUser: IUser) => {
        return dbUser.username === credential.username && dbUser.password === credential.password;
    });
};


import {ICredential, IUser} from "../../interfaces/interfaces";

export interface IAuthService {
    authenticate(credential: ICredential): Promise<IUser>
    signout(): Promise<any>
}

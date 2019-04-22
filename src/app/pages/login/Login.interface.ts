import {ICredential} from "../../interfaces/interfaces";

export interface ILoginState {
    credential: ICredential;
    validationMessage: string;
}

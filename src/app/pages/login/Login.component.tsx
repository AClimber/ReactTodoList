import * as React from 'react';
import {CSSProperties, ReactNode} from "react";

/*Interfaces*/
import {
    ICredential,
    IDefaultProps,
    IUser
} from "../../interfaces/interfaces";
import {ILoginState} from "./Login.interface";
import {AuthService} from "../../services/authorization/authorization.service";
import {IAuthService} from "../../services/authorization/authorization.interface";

export class LoginComponent extends React.Component<IDefaultProps, ILoginState> {
    private authService: IAuthService;

    constructor(props: IDefaultProps) {
        super(props);

        this.state = {
            credential: {
                username: '',
                password: ''
            },
            validationMessage: ''
        };

        this.authService = new AuthService();
    }

    onSingIn = event => {
        let {username, password}: ICredential = this.state.credential;

        event.preventDefault();

        this.authService.authenticate(this.state.credential)
            .then((user: IUser) => {
                //ToDo: Redirect
                console.log('Authenticated: ', user.username);
                this.setState({
                    validationMessage: ''
                });
            })
            .catch((error) => {
                this.setState({
                    validationMessage: error.message
                });
            });
    };

    onInputChange = event => {
        const credential: ICredential = this.state.credential;
        const fieldName: string = event.target.name;

        credential[fieldName] = event.target.value;
        this.setState({
            credential: credential
        });
    };

    validateForm = (): boolean => {
        let {username, password}: ICredential = this.state.credential;

        return username.length > 0 && password.length > 0;
    };

    render(): ReactNode {
        const loginContainerStyle: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };

        return (
            <form style={loginContainerStyle}>
                <h2>Welcome to site</h2>

                <p>{this.state.validationMessage}</p>

                <input name='username' value={this.state.credential.username} onChange={this.onInputChange}/>
                <input type='password' name='password' value={this.state.credential.password} onChange={this.onInputChange}/>
                <button onClick={this.onSingIn} disabled={!this.validateForm()}>Sing in</button>
            </form>
        );
    }
}

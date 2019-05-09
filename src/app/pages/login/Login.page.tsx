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
import {ROUTES} from "../../routes";

export class LoginPage extends React.Component<IDefaultProps, ILoginState> {
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
        this.onSingIn = this.onSingIn.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    private onSingIn(event: React.MouseEvent): void {
        event.preventDefault();
        this.authService.authenticate(this.state.credential)
            .then((user: IUser) => {
                this.setState({
                    validationMessage: ''
                });
                this.props.history.push(ROUTES.DASHBOARD);
            })
            .catch((error) => {
                this.setState({
                    validationMessage: error.message
                });
            });
    };

    private onInputChange(event: React.ChangeEvent): void {
        const credential: ICredential = this.state.credential;
        const fieldName: string = event.target['name'];

        credential[fieldName] = event.target['value'];
        this.setState({
            credential: credential
        });
    };

    private validateForm(): boolean {
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
                <h2>Добро пожаловать на сайт!</h2>

                <p>{this.state.validationMessage}</p>

                <input name='username' value={this.state.credential.username} onChange={this.onInputChange}/>
                <input type='password' name='password' value={this.state.credential.password} onChange={this.onInputChange}/>
                <button onClick={this.onSingIn} disabled={!this.validateForm()}>Sing in</button>
            </form>
        );
    }
}

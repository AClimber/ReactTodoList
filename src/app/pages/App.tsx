import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";

import { IDefaultProps, IDefaultState } from "../interfaces/interfaces";
import { LoginComponent } from "./login/Login.component";
import { MainComponent } from "./main/Main.component";
import { NotFound } from "./notFound/NotFound.component";

import { ROUTES } from "../../app/routes";

export class AppComponent extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    componentWillMount(): void {
        //ToDO: send request to authorize User
    }

    render() {
        const loggedIn = true;
        const { LOGIN, DASHBOARD, NOT_FOUND } = ROUTES;

        return (
            <Router>
                <Switch>
                    <Route path={LOGIN} component={LoginComponent} />
                    <Route path={DASHBOARD} component={MainComponent} />
                    <Route path={NOT_FOUND} component={NotFound} />
                    <Route exact path="/" render={() => (
                        loggedIn ? (
                            <Redirect to={DASHBOARD}/>
                        ) : (
                            <Redirect to={LOGIN}/>
                        )
                    )}/>
                </Switch>
            </Router>
        );
    }
}

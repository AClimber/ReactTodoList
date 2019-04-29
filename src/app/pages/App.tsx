import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";

import { IDefaultProps, IDefaultState } from "../interfaces/interfaces";
import { LoginComponent } from "./login/Login.component";
import { MainComponent } from "./main/Main.component";
import {DictionaryComponent} from "./dictionary/Dictionary.component";
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
        const { LOGIN, DASHBOARD, DICTIONARY, NOT_FOUND } = ROUTES;

        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (
                        loggedIn ? (
                            <Redirect to={DICTIONARY}/>
                        ) : (
                            <Redirect to={LOGIN}/>
                        )
                    )}/>
                    <Route path={LOGIN} component={LoginComponent} />
                    <Route path={DASHBOARD} component={MainComponent} />
                    <Route path={DICTIONARY} component={DictionaryComponent} />
                    <Route path={NOT_FOUND} component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from "react-router-dom";

import { IDefaultProps, IDefaultState } from "../interfaces/interfaces";
import {LoginPage} from "./login/Login.page";
import {MainPage} from "./main/Main.page";
import {DictionaryPage} from "./dictionary/Dictionary.page";
import {DepartmentPage} from "./department/Department.page";
import {NotFound} from "./notFound/NotFound.page";

import {ROUTES} from "../../app/routes";

export class AppComponent extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    componentWillMount(): void {
        //ToDO: send request to authorize User
    }

    render() {
        const loggedIn = true;
        const { LOGIN, DASHBOARD, DICTIONARY, DEPARTMENT, NOT_FOUND } = ROUTES;

        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (
                        loggedIn ? (
                            <Redirect to={DEPARTMENT}/>
                        ) : (
                            <Redirect to={LOGIN}/>
                        )
                    )}/>
                    <Route path={LOGIN} component={LoginPage} />
                    <Route path={DASHBOARD} component={MainPage} />
                    <Route path={DEPARTMENT} component={DepartmentPage} />
                    <Route path={DICTIONARY} component={DictionaryPage} />
                    <Route path={NOT_FOUND} component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

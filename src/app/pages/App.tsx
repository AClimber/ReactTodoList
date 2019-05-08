import * as React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import {IDefaultProps} from "../interfaces/interfaces";
import {LoginPage} from "./login/Login.page";
import {DashboardPage} from "./dashboard/Dashboard.page";
import {DictionaryPage} from "./dictionary/Dictionary.page";
import {DepartmentPage} from "./department/Department.page";
import {OrderPage} from "./order/Order.page";
import {NotFound} from "./notFound/NotFound.page";
import {ROUTES} from "../../app/routes";
import {NavigationBarComponent} from "../components/navigationBar/navigationBar.component";
import {ILink} from "../components/navigationBar/navigationBar.interface";

interface IAppState {
    linkList: ILink[];
}

export class AppComponent extends React.Component<IDefaultProps, IAppState> {
    constructor(props: IDefaultProps) {
        super(props);

        this.state = {
            linkList: []
        };
    }

    componentWillMount(): void {
        //ToDO: send request to authorize User 
        this.setState({
            linkList: this.getLinkListForUser('')
        })
    }

    private getLinkListForUser(role): ILink[] {
        const { DASHBOARD, DICTIONARY, DEPARTMENT, ORDER } = ROUTES;

        return [
            {
                path: DICTIONARY,
                label: 'Dictionary'
            },
            {
                path: DEPARTMENT,
                label: 'Items for order'
            },
            {
                path: ORDER,
                label: 'Order'
            },
            {
                path: DASHBOARD,
                label: 'Dashboard'
            }
        ];
    }

    render() {
        const loggedIn = true;
        const { LOGIN, DASHBOARD, DICTIONARY, DEPARTMENT, ORDER, NOT_FOUND } = ROUTES;

        return (
            <Router>
                <NavigationBarComponent linkList={this.state.linkList} />
                <Switch>
                    <Route exact path="/" render={() => (
                        loggedIn ? (
                            <Redirect to={ORDER}/>
                        ) : (
                            <Redirect to={LOGIN}/>
                        )
                    )}/>
                    <Route path={LOGIN} component={LoginPage} />
                    <Route path={DASHBOARD} component={DashboardPage} />
                    <Route path={DEPARTMENT} component={DepartmentPage} />
                    <Route path={DICTIONARY} component={DictionaryPage} />
                    <Route path={ORDER} component={OrderPage} />
                    <Route path={NOT_FOUND} component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

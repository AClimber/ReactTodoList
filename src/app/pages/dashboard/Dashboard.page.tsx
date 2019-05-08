import * as React from 'react';
import { ReactNode } from "react";

import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";

export class DashboardPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <h3>Dashboard page</h3>
                <hr/>
                Here will information about Orders which was created on the Order Page!
            </div>
        );
    }
}

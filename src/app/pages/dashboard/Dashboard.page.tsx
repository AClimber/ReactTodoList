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
                <div>Dashboard page</div>
                <hr/>
            </div>
        );
    }
}

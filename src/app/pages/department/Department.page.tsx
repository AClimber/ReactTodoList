import * as React from 'react';
import { ReactNode } from "react";

import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";
import {DepartmentComponent} from "../../components/department/Department.component";

export class DepartmentPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <h3>Department page</h3>
                <hr/>
                <DepartmentComponent/>
            </div>
        );
    }
}

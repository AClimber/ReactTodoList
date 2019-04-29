import * as React from 'react';
import { ReactNode } from "react";

/*Interfaces*/
import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";
import {DepartmentComponent} from "../../components/department/Department.component";

/*Components*/

export class DepartmentPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);

        this.state = {
            categoryList: []
        }
    }

    render(): ReactNode {
        return (
            <div>
                <div>Department page</div>
                <hr/>
                <DepartmentComponent></DepartmentComponent>
            </div>
        );
    }
}

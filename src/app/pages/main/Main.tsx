import * as React from 'react';
import { ReactNode } from "react";
import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";

export class Main extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    render(): ReactNode {
        return <div>Hello React from the main page</div>;
    }
}

import * as React from 'react';
import { ReactNode } from "react";
import {
    IDefaultProps,
    ITask
} from "../../interfaces/interfaces";
import { IMainState } from "./Main.interface";
import { BackendService } from "../../services/backend.service";
import { IBackendService } from "../../services/backend.interface";

export class Main extends React.Component<IDefaultProps, IMainState> {
    private backendService: IBackendService;

    constructor(props: IDefaultProps) {
        super(props);

        this.backendService = BackendService.getInstance();
        this.state = {
            tasks: []
        };
    }

    componentWillMount(): void {
        this.backendService.getTasks().then(this.onSuccess, this.onError)
    }

    render(): ReactNode {
        const listItems: ReactNode = this.state.tasks.map((value) =>
            <li key={value.id}>{value.description}</li>
        );

        return (
            <div>
                <div>Hello React from the main page</div>

                <ul>{listItems}</ul>
            </div>
        );
    }

    private onSuccess = (data: ITask[]): void => {
        this.setState({tasks: data});
    };

    private onError = (errObj: any): void => {
    };
}

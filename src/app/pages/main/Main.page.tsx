import * as React from 'react';
import { ReactNode } from "react";

/*Interfaces*/
import {
    IDefaultProps,
    ITask
} from "../../interfaces/interfaces";
import { IMainState } from "./Main.interface";
import { IBackendService } from "../../services/backend.interface";

/*Services*/
import { BackendService } from "../../services/backend.service";

/*Components*/
import { ToDo } from "../../components/todo/ToDo.component";

export class MainPage extends React.Component<IDefaultProps, IMainState> {
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
        return (
            <div>
                <div>Hello React from the main page</div>

                <ToDo tasks = { this.state.tasks }/>
            </div>
        );
    }

    private onSuccess = (data: ITask[]): void => {
        this.setState({tasks: data});
    };

    private onError = (errObj: any): void => {
    };
}

import * as React from 'react';
import {
    IToDoProps,
    IToDoState
} from "./ToDo.interface";
import { ReactNode } from "react";

import { ToDoItem } from "./todoItem/ToDoItem.component";

export class ToDo extends React.Component<IToDoProps, IToDoState> {
    constructor(props: IToDoProps) {
        super(props);
    }

    render(): React.ReactNode {
        const listItems: ReactNode = this.props.tasks.map((value) =>
            <ToDoItem task = {value} key = {value.id}/>
        );

        return <ul>{listItems}</ul>;
    }
}

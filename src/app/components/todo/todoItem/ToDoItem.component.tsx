import * as React from 'react';
import { IToDoItemProps } from "./ToDoItem.interface";

export const ToDoItem: React.FunctionComponent<IToDoItemProps> = (props: IToDoItemProps) => {
    return <li key={props.task.id}>{props.task.description}</li>
};

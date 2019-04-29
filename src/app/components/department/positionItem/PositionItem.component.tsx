import * as React from 'react';
import {IPositionItemProps, IPositionItemState} from "./PositionItem.interface";

export class PositionItemComponent extends React.Component<IPositionItemProps, IPositionItemState> {
    constructor(props: IPositionItemProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {name, category, attribute, value} = this.props.item;
        return (
            <tr>
                <td>{name}</td>
                <td>{category.name}</td>
                <td>{attribute.name}</td>
                <td>{value}</td>
            </tr>
        );
    }
}

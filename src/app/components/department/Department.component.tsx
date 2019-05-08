import * as React from 'react';
import {IDepartmentProps, IDepartmentState} from "./Department.interface";
import {PositionItemComponent} from "./positionItem/PositionItem.component";
import {IPositionItem} from "./positionItem/PositionItem.interface";
import {map} from "lodash-es";
import {DepartmentStyles} from "./Department.styles";

export class DepartmentComponent extends React.Component<IDepartmentProps, IDepartmentState> {
    constructor(props: IDepartmentProps) {
        super(props);

        this.state = {
            categoryList: [],
            attributeList: [],
            positionList: []
        };

        this.addNewPosition = this.addNewPosition.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
    }

    componentWillMount(): void {
        //ToDo: get category list with attributes from BE
        this.setState({
            categoryList: [
                {
                    id: 1,
                    name: 'Paper',
                    attributes: [
                        {id: 1, name: 'Format'},
                        {id: 2, name: 'Color'}
                    ]
                }, {
                    id: 2,
                    name: 'Test 1',
                    attributes: [
                        {id: 5, name: 'attr 1'},
                        {id: 6, name: 'attr 2'}
                    ]
                }
            ],
            attributeList: [
                {id: 1, name: 'Format', categoryId: 1},
                {id: 2, name: 'Color', categoryId: 1},
                {id: 5, name: 'attr 1', categoryId: 2},
                {id: 6, name: 'attr 2', categoryId: 2}
            ]
        });
    }

    private addNewPosition(): void {
        const newPosition: IPositionItem = {
            id: Date.now(),
            name: 'Undefined position name',
            category: null,
            attribute: null,
            value: 'Undefined value'
        };

        this.setState({
            positionList: [...this.state.positionList, newPosition]
        });
    }

    private onChangeItem(item: IPositionItem): void {
        const updatedPositionList: IPositionItem[] = map(this.state.positionList, position => {
            if (item.id === position.id) {
                return item;
            }
            return position;
        });

        this.setState({
            positionList: updatedPositionList
        });
    }

    render(): React.ReactNode {
        const positionListElement = map(this.state.positionList, positionItem => {
            return (
                <PositionItemComponent 
                    key={positionItem.id}
                    item={positionItem} 
                    categoryList={this.state.categoryList}
                    attributeList={this.state.attributeList}
                    onChangeItem={this.onChangeItem}
                />
            );
        });
        const positionListTable = (
            <table style = {DepartmentStyles.Table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {positionListElement}
                </tbody>
            </table>
        );

        return (
            <div className="container">
                {positionListTable}

                <button onClick={this.addNewPosition}>
                    Add position
                </button>
            </div>
        );
    }
}

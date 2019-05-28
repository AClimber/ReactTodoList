import * as React from 'react';
import {IDepartmentProps, IDepartmentState} from "./Department.interface";
import {PositionItemComponent} from "./positionItem/PositionItem.component";
import {IPositionItem} from "./positionItem/PositionItem.interface";
import {map, filter, forEach, assign} from "lodash-es";
import {IDataStorage} from '../../services/dataStorage/dataStorage.interface';
import {DataStorage} from '../../services/dataStorage/dataStorage.service';
import {DataStorageConstants} from '../../services/dataStorage/dataStorage.constant';
import {ICategory} from '../dictionary/Dictionary.interface';

export class DepartmentComponent extends React.Component<IDepartmentProps, IDepartmentState> {
    private dataStorage: IDataStorage;

    constructor(props: IDepartmentProps) {
        super(props);

        this.dataStorage = new DataStorage();
        this.state = {
            categoryList: [],
            positionList: []
        };

        this.addNewPosition = this.addNewPosition.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    componentWillMount(): void {
        const categoryList: ICategory[] = this.dataStorage.getData(DataStorageConstants.TABLE.CATEGORY);
        const positionList: IPositionItem[] = this.dataStorage.getData(DataStorageConstants.TABLE.POSITION);

        this.setState({
            categoryList: categoryList || [],
            positionList: positionList || []
        });
    }

    private addNewPosition(): void {
        const newPosition: IPositionItem = {
            id: Date.now(),
            name: 'Неизвестная позиция',
            category: null,
            attributes: null,
            amount: 0
        };

        this.setState({
            positionList: [...this.state.positionList, newPosition]
        }, this.savePosition);
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
        }, this.savePosition);
    }

    private onRemoveItem(id: number): void {
        this.setState({
            positionList: filter(this.state.positionList, position => {
                return position.id !== id;
            })
        }, this.savePosition);
    }

    private savePosition(): void {
        this.dataStorage.saveData(DataStorageConstants.TABLE.POSITION, this.state.positionList);
    }

    render(): React.ReactNode {
        const positionListElement: React.ReactNode = map(this.state.positionList, positionItem => {
            return (
                <PositionItemComponent
                    key={positionItem.id}
                    item={positionItem}
                    categoryList={this.state.categoryList}
                    onChangeItem={this.onChangeItem}
                    onRemoveItem={this.onRemoveItem}
                />
            );
        });
        const positionListTable: React.ReactNode = this.state.positionList.length > 0
            ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-column">Имя</th>
                            <th className="table-column">Категория</th>
                            <th className="table-column">Аттрибут</th>
                            <th className="table-column">Количество</th>
                            <th className="table-column"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {positionListElement}
                    </tbody>
                </table>
            )
            : null;

        return (
            <div className="container">
                {positionListTable}

                <button className="button" onClick={this.addNewPosition}>
                    Добавить позицию
                </button>
            </div>
        );
    }
}

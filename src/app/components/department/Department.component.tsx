import * as React from 'react';
import {IDepartmentProps, IDepartmentState, IAttributeWithCatagory} from "./Department.interface";
import {PositionItemComponent} from "./positionItem/PositionItem.component";
import {IPositionItem} from "./positionItem/PositionItem.interface";
import {map, filter, forEach, assign} from "lodash-es";
import {CommonStyles} from '../../styles/Common.style';
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
            attributeList: [],
            positionList: []
        };

        this.addNewPosition = this.addNewPosition.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    componentWillMount(): void {
        //ToDo: get category list with attributes from BE
        const categoryList: ICategory[] = this.dataStorage.getData(DataStorageConstants.TABLE.CATEGORY);
        const positionList: IPositionItem[] = this.dataStorage.getData(DataStorageConstants.TABLE.POSITION);
        let attributeList: IAttributeWithCatagory[] = [];

        forEach(categoryList, category=> {
            attributeList.push(...map(category.attributes, attr => assign({categoryId: category.id}, attr)));
        }) 
        
        this.setState({
            categoryList: categoryList || [],
            attributeList: attributeList || [],
            positionList: positionList || []
        });
    }

    private addNewPosition(): void {
        const newPosition: IPositionItem = {
            id: Date.now(),
            name: 'Неизвестная позиция',
            category: null,
            attribute: null,
            value: 'Неопределенное значение'
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
                    attributeList={this.state.attributeList}
                    onChangeItem={this.onChangeItem}
                    onRemoveItem={this.onRemoveItem}
                />
            );
        });
        const positionListTable: React.ReactNode = this.state.positionList.length > 0
            ? (
                <table style = {CommonStyles.Table}>
                    <thead>
                        <tr>
                            <th style={CommonStyles.TableColumn}>Имя</th>
                            <th style={CommonStyles.TableColumn}>Категория</th>
                            <th style={CommonStyles.TableColumn}>Аттрибут</th>
                            <th style={CommonStyles.TableColumn}>Значение</th>
                            <th style={CommonStyles.TableColumn}></th>
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

                <button style={CommonStyles.Button} onClick={this.addNewPosition}>
                    Добавить позицию
                </button>
            </div>
        );
    }
}

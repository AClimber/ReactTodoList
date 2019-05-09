import * as React from 'react';
import {ReactNode} from "react";

import {ICategory, IDictionaryProps, IDictionaryState} from "./Dictionary.interface";
import {CategoryItem} from "./categoryItem/CategoryItem.component";
import {filter, map} from "lodash-es";
import {CommonStyles} from '../../styles/Common.style';
import {DataStorage} from '../../services/dataStorage/dataStorage.service';
import {IDataStorage} from '../../services/dataStorage/dataStorage.interface';
import {DataStorageConstants} from '../../services/dataStorage/dataStorage.constant';

export class DictionaryComponent extends React.Component<IDictionaryProps, IDictionaryState> {
    private dataStorage: IDataStorage;

    constructor(props: IDictionaryProps) {
        super(props);

        this.dataStorage = new DataStorage();

        this.state = {
            categoryList: this.dataStorage.getData(DataStorageConstants.TABLE.CATEGORY) || []
        };


        this.addNewCategory = this.addNewCategory.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onCategoryRemove = this.onCategoryRemove.bind(this);
    }

    private addNewCategory(): void {
        const category: ICategory = {
            id: Date.now(),
            name: 'Неизвестная категория',
            attributes: []
        };

        this.setState({
            categoryList: [...this.state.categoryList, category]
        }, this.saveCategory);
    }

    private onCategoryChange(category: ICategory): void {
        const updatedCategoryList: ICategory[] = map(this.state.categoryList, (value: ICategory) => {
            if (value.id === category.id) {
                return category;
            }
            return value;
        });

        this.setState({
            categoryList: updatedCategoryList
        }, this.saveCategory);
    }

    private onCategoryRemove(id: number): void {
        const updatedCategoryList: ICategory[] = filter(this.state.categoryList, (value: ICategory) => {
            return value.id !== id;
        });

        this.setState({
            categoryList: updatedCategoryList
        }, this.saveCategory);
    }

    private saveCategory(): void {
        this.dataStorage.saveData(DataStorageConstants.TABLE.CATEGORY, this.state.categoryList);
    }

    render(): React.ReactNode {
        const listItems: ReactNode = this.state.categoryList.map((value) =>
            <CategoryItem
                key = {value.id}
                category = {value}
                onChange = {this.onCategoryChange}
                onRemove = {this.onCategoryRemove}
            />
        );

        return (
            <div className="dictionary-container">
                {listItems}

                <button className="add-button" onClick={this.addNewCategory} style={CommonStyles.Button}>
                    Добавить категорию
                </button>
            </div>
        );
    }
}

import * as React from 'react';
import {CSSProperties, ReactNode} from "react";

import {ICategory, IDictionaryProps, IDictionaryState} from "./Dictionary.interface";
import {CategoryItem} from "./categoryItem/CategoryItem.component";
import {filter, map} from "lodash-es";
import {DictionaryStyles} from "./Dictionary.style";

export class Dictionary extends React.Component<IDictionaryProps, IDictionaryState> {
    constructor(props: IDictionaryProps) {
        super(props);

        this.state = {
            categoryList: []
        };

        this.addNewCategory = this.addNewCategory.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onCategoryRemove = this.onCategoryRemove.bind(this);
    }

    private addNewCategory(): void {
        const category: ICategory = {
            id: Date.now(),
            name: 'Undefined Category',
            attributes: []
        };

        this.setState({
            categoryList: [...this.state.categoryList, category]
        });
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
        });
    }

    private onCategoryRemove(id: number): void {
        const updatedCategoryList: ICategory[] = filter(this.state.categoryList, (value: ICategory) => {
            return value.id !== id;
        });

        this.setState({
            categoryList: updatedCategoryList
        });
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

                <button className="add-button" onClick={this.addNewCategory} style={DictionaryStyles.AddCategoryButton}>
                    Add category
                </button>
            </div>
        );
    }
}

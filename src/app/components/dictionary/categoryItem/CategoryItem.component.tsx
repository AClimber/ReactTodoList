import * as React from 'react';
import {assign, filter, map} from "lodash-es";

import {ICategoryItemProps} from "./CategoryItem.interface";
import {IAttribute, ICategory} from "../Dictionary.interface";
import {IDefaultState} from "../../../interfaces/interfaces";

import {InputValueComponent} from "../../inputValue/InputValue.component"
import {DictionaryStyles} from "../Dictionary.style";
import { CommonStyles } from '../../../styles/Common.style';

export class CategoryItem extends React.Component<ICategoryItemProps, IDefaultState> {
    constructor(props: ICategoryItemProps) {
        super(props);

        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onCategoryRemove = this.onCategoryRemove.bind(this);

        this.onAttributeChange = this.onAttributeChange.bind(this);
        this.onAttributeRemove = this.onAttributeRemove.bind(this);
        this.addNewAttribute = this.addNewAttribute.bind(this);
    }

    private onCategoryRemove(): void {
        this.props.onRemove(this.props.category.id);
    };
    private onCategoryChange(value: string): void {
        const category: ICategory = assign({}, this.props.category, {name: value});

        this.props.onChange(category);
    };

    private onAttributeChange(value: string, id: number): void {
        const newAttributes = map(this.props.category.attributes, attribute => {
            if (attribute.id === id) {
                return assign({}, attribute, {name: value});
            }
            return attribute;
        });
        const category: ICategory = assign({}, this.props.category, {attributes: newAttributes});

        this.props.onChange(category);
    }

    private onAttributeRemove(id: number): void {
        const newAttributes = filter(this.props.category.attributes, attribute => {
            return attribute.id !== id;
        });
        const category: ICategory = assign({}, this.props.category, {attributes: newAttributes});

        this.props.onChange(category);
    }

    private addNewAttribute(): void {
        const newAttributes = [...this.props.category.attributes, {
            id: Date.now(),
            name: 'Undefined Attribute'
        }];
        const category: ICategory = assign({}, this.props.category, {attributes: newAttributes});

        this.props.onChange(category);
    }

    render(): React.ReactNode {
        const attributesElement = map(this.props.category.attributes, (attribute: IAttribute) => {
            return (
                <InputValueComponent
                    key = {attribute.id}
                    id = {attribute.id}
                    value={attribute.name}
                    onChange={this.onAttributeChange}
                    onRemove={this.onAttributeRemove}
                ></InputValueComponent>
            );
        });

        return (
            <div style={CommonStyles.Container}>
                <InputValueComponent
                    value={this.props.category.name}
                    onChange={this.onCategoryChange}
                    onRemove={this.onCategoryRemove}
                ></InputValueComponent>
                <hr/>
                {attributesElement}
                <button className="add-button" onClick={this.addNewAttribute} style={CommonStyles.Button}>
                    Add attribute
                </button>
            </div>
        );
    }

}

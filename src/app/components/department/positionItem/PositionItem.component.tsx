import * as React from 'react';
import {IPositionItemProps, IPositionItemState, IPositionItem} from "./PositionItem.interface";
import {ReactNode} from "react";
import {ICategory} from '../../dictionary/Dictionary.interface';
import {CustomSelectComponent} from "./../../customSelect/CustomSelect.component";
import {IAttributeWithCatagory} from '../Department.interface';
import {get, filter, assign, omit, head} from 'lodash-es';
import {ICustomSelectSettings} from '../../customSelect/CustomSelect.interface';
import {InputValueComponent} from '../../inputValue/InputValue.component';


export class PositionItemComponent extends React.Component<IPositionItemProps, IPositionItemState> {
    constructor(props: IPositionItemProps) {
        super(props);

        this.categoryChange = this.categoryChange.bind(this);
        this.attributeChange = this.attributeChange.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    
    private categoryChange(selectedOption: ICategory): void {
        const updatedItem: IPositionItem = assign({}, this.props.item, {
            category: selectedOption,
            attribute: head(selectedOption.attributes)
        });
        this.props.onChangeItem(updatedItem);
    }

    private attributeChange(selectedOption: IAttributeWithCatagory): void {
        const updatedItem: IPositionItem = assign({}, this.props.item, {
            attribute: omit(selectedOption, ['categoryId'])
        });
        this.props.onChangeItem(updatedItem);
    }

    private valueChange(event: React.ChangeEvent): void {
        //ToDo: validate value
        const isValid = true;
        const value = event.target['value'];

        if (!isValid) {
            return;
        }

        const updatedItem: IPositionItem = assign({}, this.props.item, {
            value: value
        });
        this.props.onChangeItem(updatedItem); 
    }

    private nameChange(value: string): void {
        const updatedItem: IPositionItem = assign({}, this.props.item, {
            name: value
        });
        this.props.onChangeItem(updatedItem); 
    }

    private removeItem():void {
        this.props.onRemoveItem(this.props.item.id); 
    }

    render(): React.ReactNode {
        const {name, category, attribute, value} = this.props.item;
        const selectedCategoryId = get(category, 'id');
        const selectedAttributeId = get(attribute, 'id');
        const filteredAttributeList = selectedCategoryId
            ? filter(this.props.attributeList, {categoryId: selectedCategoryId})
            : [];
        const attributeSelectSettings: ICustomSelectSettings = {
            isDisabled: selectedCategoryId ? false : true
        };
        const categoryListElement: ReactNode =  
            <CustomSelectComponent
                onChange={this.categoryChange}
                list={this.props.categoryList}
                selectedItemId={selectedCategoryId}
            />
        const attributeListElement: ReactNode =  
            <CustomSelectComponent
                onChange={this.attributeChange}
                list={filteredAttributeList}
                selectedItemId={selectedAttributeId}
                settings={attributeSelectSettings}
            />
        const valueElement: ReactNode = 
            <input
                value={value}
                onChange={this.valueChange}
            />
        const nameElement: ReactNode = 
            <InputValueComponent
                value={name}
                onChange={this.nameChange}
            />
        return (
            <tr>
                <td>
                    {nameElement}
                </td>
                <td>
                    {categoryListElement}
                </td>
                <td>
                    {attributeListElement}
                </td>
                <td>
                    {valueElement}
                </td>
                <th>
                    <button onClick={this.removeItem}>Удалить</button>
                </th>
            </tr>
        );
    }
}

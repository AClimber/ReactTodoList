import * as React from 'react';
import {IPositionItemProps, IPositionItemState, IPositionItem, IAttributeWithValue} from "./PositionItem.interface";
import {ReactNode} from "react";
import {ICategory} from '../../dictionary/Dictionary.interface';
import {CustomSelectComponent} from "./../../customSelect/CustomSelect.component";
import {get, assign, map, forEach} from 'lodash-es';
import {InputValueComponent} from '../../inputValue/InputValue.component';


export class PositionItemComponent extends React.Component<IPositionItemProps, IPositionItemState> {
    constructor(props: IPositionItemProps) {
        super(props);

        this.categoryChange = this.categoryChange.bind(this);
        //this.attributeChange = this.attributeChange.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    private categoryChange(selectedOption: ICategory): void {
        const attributes: IAttributeWithValue[] = map(selectedOption.attributes, attribute => {
            return assign({}, attribute, {value: 'Неизвестное значение'});
        });
        const updatedItem: IPositionItem = assign({}, this.props.item, {
            category: selectedOption,
            attributes: attributes
        });
        this.props.onChangeItem(updatedItem);
    }

    private attributeChange(attrId: number, event: React.ChangeEvent): void {
        const updatedAttributes = forEach(this.props.item.attributes, attribute => {
            if (attribute.id === attrId) {
                attribute.value = event.target['value'];
            }
        });
        const updatedItem: IPositionItem = assign({}, this.props.item, {
            attributes: updatedAttributes
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
            amount: value
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
        const {name, category, attributes, amount} = this.props.item;
        const selectedCategoryId = get(category, 'id');
        const categoryListElement: ReactNode =
            <CustomSelectComponent
                onChange={this.categoryChange}
                list={this.props.categoryList}
                selectedItemId={selectedCategoryId}
            />;
        const attributeListElement: ReactNode[] = map(attributes, attr => {
            return (
                <div key={selectedCategoryId + '-' + attr.id} id={'category-' + selectedCategoryId + '-attribute-' + attr.id}>
                    <label>{attr.name}</label>
                    <input className="custom-input" value={attr.value} onChange={this.attributeChange.bind(this, attr.id)}/>
                </div>
            )
        });
        const valueElement: ReactNode =
            <input
                className="custom-input"
                value={amount}
                onChange={this.valueChange}
            />;
        const nameElement: ReactNode =
            <InputValueComponent
                value={name}
                onChange={this.nameChange}
            />;
        const rowStyle: React.CSSProperties = {
            height: 30 * attributeListElement.length +'px',
            verticalAlign: "top"
        };

        return (
            <tr style={rowStyle}>
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
                    <button className="button-quick button-delete" onClick={this.removeItem}></button>
                </th>
            </tr>
        );
    }
}

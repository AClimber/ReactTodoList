import * as React from 'react';

import {IOrderItemProps, IOrderItemState} from './OrderItem.interface';
import {CustomSelectComponent} from "./../../customSelect/CustomSelect.component";
import {assign, get} from 'lodash-es';
import {IOrder, IClient} from '../Order.interface';
import {IPositionItem} from '../../department/positionItem/PositionItem.interface';

export class OrderItemComponent extends React.Component<IOrderItemProps, IOrderItemState> {
    constructor(props: IOrderItemProps) {
        super(props);

        this.positionChange = this.positionChange.bind(this);
        this.clientChange = this.clientChange.bind(this);
        this.amountChange = this.amountChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    private positionChange(selectedOption: IPositionItem): void {
        const updatedItem: IOrder = assign({}, this.props.item, {
            position: selectedOption
        });
        this.props.onChangeItem(updatedItem);
    }

    private clientChange(selectedOption: IClient): void {
        const updatedItem: IOrder = assign({}, this.props.item, {
            client: selectedOption
        });
        this.props.onChangeItem(updatedItem);
    }

    private amountChange(event: React.ChangeEvent): void {
        //validate value
        const isValid = true;
        const value = event.target['value'];

        if (!isValid) {
            return;
        }

        const updatedItem: IOrder = assign({}, this.props.item, {
            amount: value
        });
        this.props.onChangeItem(updatedItem); 
    }

    private priceChange(event: React.ChangeEvent): void {
        //ToDo: validate value
        const isValid = true;
        const value = event.target['value'];

        if (!isValid) {
            return;
        }

        const updatedItem: IOrder = assign({}, this.props.item, {
            price: value
        });
        this.props.onChangeItem(updatedItem); 
    }

    private removeItem(): void {
        this.props.onRemoveItem(this.props.item.id);
    }

    render(): React.ReactNode {
        const {position, amount, client, price} = this.props.item;
        const positionId = get(position, 'id');
        const clientId = get(client, 'id');
        const positionSelectElement: React.ReactNode = 
            <CustomSelectComponent
                onChange={this.positionChange} 
                list={this.props.positionList}
                selectedItemId={positionId}       
            />;
        const clientSelectElement: React.ReactNode = 
            <CustomSelectComponent
                onChange={this.clientChange} 
                list={this.props.clientList}
                selectedItemId={clientId}       
            />;
        const amountElement: React.ReactNode = 
            <input
                value={amount}
                onChange={this.amountChange}
            />;
        const priceElement: React.ReactNode = 
            <input
                value={price}
                onChange={this.priceChange}
            />;
        return (
            <tr>
                <td>
                    {positionSelectElement}
                </td>
                <td>
                    {amountElement}
                </td>
                <td>
                    {clientSelectElement}
                </td>
                <td>
                    {priceElement}
                </td>
                <td>
                    <button onClick={this.removeItem}>Remove</button>
                </td>
            </tr>
        )
    }
}
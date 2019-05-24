import * as React from 'react';

import {IOrderItemProps, IOrderItemState} from './OrderItem.interface';
import {CustomSelectComponent} from "./../../customSelect/CustomSelect.component";
import {assign, filter, forEach, get, map} from 'lodash-es';
import {IOrder, IClient, IPositionItemWithAmount} from '../Order.interface';
import {IPositionItem} from '../../department/positionItem/PositionItem.interface';
import {InputValueComponent} from "../../inputValue/InputValue.component";

export class OrderItemComponent extends React.Component<IOrderItemProps, IOrderItemState> {
    constructor(props: IOrderItemProps) {
        super(props);

        // this.positionChange = this.positionChange.bind(this);
        this.clientChange = this.clientChange.bind(this);
        // this.amountChange = this.amountChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addPositionToOrder = this.addPositionToOrder.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    private positionChange(positionId: number, selectedOption: IPositionItem): void {
        const updatedPositions = forEach(this.props.item.positions, position => {
           if (position.positionId === positionId) {
               position.positionId = selectedOption.id;
           }
        });
        const updatedItem: IOrder = assign({}, this.props.item, {
            positions: updatedPositions
        });
        this.props.onChangeItem(updatedItem);
    }

    private clientChange(selectedOption: IClient): void {
        const updatedItem: IOrder = assign({}, this.props.item, {
            client: selectedOption
        });
        this.props.onChangeItem(updatedItem);
    }

    private amountChange(positionId: number, event: React.ChangeEvent): void {
        //validate value
        const isValid = true;
        const value = event.target['value'];

        if (!isValid) {
            return;
        }

        const updatedPositions = forEach(this.props.item.positions, position => {
            if (position.positionId === positionId) {
                position.amount = value;
            }
        });
        const updatedItem: IOrder = assign({}, this.props.item, {
            positions: updatedPositions
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

    private addPositionToOrder(): void {
        const newPosition: IPositionItemWithAmount = {
            positionId: undefined,
            amount: 0
        };
        const updatedItem: IOrder = assign({}, this.props.item, {
            positions: [...this.props.item.positions, newPosition]
        });

        this.props.onChangeItem(updatedItem);
    }

    private removePositionFromOrder(positionId: number): void {
        const filteredPositions: IPositionItemWithAmount[] = filter(this.props.item.positions, position => {
            return position.positionId !== positionId;
        });

        const updatedItem: IOrder = assign({}, this.props.item, {
            positions: filteredPositions
        });

        this.props.onChangeItem(updatedItem);
    }

    private nameChange(value: string): void {
        const updatedItem: IOrder = assign({}, this.props.item, {
            name: value
        });

        this.props.onChangeItem(updatedItem);
    }

    render(): React.ReactNode {
        const {positions, client, price, id, name} = this.props.item;
        const clientId = get(client, 'id');
        const positionSelectElementWithAmount: React.ReactNode[] = map(positions, item => {
                return (
                    <div key={id + '-' + item.positionId}>
                        <CustomSelectComponent
                            onChange={this.positionChange.bind(this, item.positionId)}
                            list={this.props.positionList}
                            selectedItemId={item.positionId}
                        />
                        <input
                            value={item.amount}
                            onChange={this.amountChange.bind(this, item.positionId)}
                        />
                        <button onClick={this.removePositionFromOrder.bind(this, item.positionId)}>Удалить позицию</button>
                    </div>
                );
            });
        const positionAddButton: React.ReactNode = <button onClick={this.addPositionToOrder}>Добавить позицию</button>;
        const clientSelectElement: React.ReactNode =
            <CustomSelectComponent
                onChange={this.clientChange}
                list={this.props.clientList}
                selectedItemId={clientId}
            />;
        const priceElement: React.ReactNode =
            <input
                value={price}
                onChange={this.priceChange}
            />;
        const rowStyle: React.CSSProperties = {
            height: 30 * positionSelectElementWithAmount.length + 'px',
            verticalAlign: "top"
        };
        const nameElement: React.ReactNode =
            <InputValueComponent
                value={name}
                onChange={this.nameChange}
            />;
        return (
            <tr style={rowStyle}>
                <td>
                    {nameElement}
                </td>
                <td>
                    {positionSelectElementWithAmount}
                    {positionAddButton}
                </td>
                <td>
                    {clientSelectElement}
                </td>
                <td>
                    {priceElement}
                </td>
                <td>
                    <button onClick={this.removeItem}>Удалить</button>
                </td>
            </tr>
        )
    }
}

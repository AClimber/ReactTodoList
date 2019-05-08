import * as React from 'react';

import {IOrderProps, IOrderState, IOrder} from './Order.interface';
import {filter, map} from 'lodash-es';
import {OrderItemComponent} from './orderItem/OrderItem.component';
import {CommonStyles} from '../../styles/Common.style';

export class OrderComponent extends React.Component<IOrderProps, IOrderState> {
    constructor(props: IOrderProps) {
        super(props);

        this.state = {
            positionList: [],
            clientList: [],
            orderList: []
        };

        this.addNewOrder = this.addNewOrder.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    componentWillMount(): void {
        //ToDo: get from BE
        this.setState({
            clientList: [
                {
                    id: 1,
                    name: 'IP 1'
                },
                {
                    id: 2,
                    name: 'IP 2'
                },
                {
                    id: 3,
                    name: 'IP 3'
                }
            ],
            positionList: [
                {
                    id: 1,
                    name: 'Position name1',
                    category: {
                        id: 1,
                        name: 'Paper',
                        attributes: [
                            {id: 1, name: 'Format'},
                            {id: 2, name: 'Color'}
                        ]
                    },
                    attribute: {id: 1, name: 'Format'},
                    value: '100'
                },
                {
                    id: 2,
                    name: 'Position name2',
                    category: {
                        id: 1,
                        name: 'Paper',
                        attributes: [
                            {id: 1, name: 'Format'},
                            {id: 2, name: 'Color'}
                        ]
                    },
                    attribute: {id: 2, name: 'Color'},
                    value: '200'
                }
            ]
        });
    }

    private addNewOrder(): void {
        const newOrder: IOrder = {
            id: Date.now(),
            position: null,
            client: null,
            amount: 0,
            price: 0
        };

        this.setState({
            orderList: [...this.state.orderList, newOrder]
        });
    }

    private onChangeItem(item: IOrder): void {
        const updatedOrderList: IOrder[] = map(this.state.orderList, order => {
            if (item.id === order.id) {
                return item;
            }
            return order;
        });

        this.setState({
            orderList: updatedOrderList
        });
    }

    private onRemoveItem(id: number): void {
        this.setState({
            orderList: filter(this.state.orderList, position => {
                return position.id !== id;
            })
        });
    }

    render(): React.ReactNode {
        const orderListElement = map(this.state.orderList, order => {
            return (
                <OrderItemComponent
                    key={order.id}
                    item={order}
                    positionList={this.state.positionList}
                    clientList={this.state.clientList}
                    onChangeItem={this.onChangeItem}
                    onRemoveItem={this.onRemoveItem}
                />
            );
        });
        const orderTable = (
            <table style = {CommonStyles.Table}>
                <thead>
                    <tr>
                        <th style={CommonStyles.TableColumn}>Position</th>
                        <th style={CommonStyles.TableColumn}>Amount</th>
                        <th style={CommonStyles.TableColumn}>Client</th>
                        <th style={CommonStyles.TableColumn}>Price</th>
                        <th style={CommonStyles.TableColumn}></th>
                    </tr>
                </thead>
                <tbody>
                    {orderListElement}
                </tbody>
            </table>
        );

        return (
            <div className="container">
                {orderTable}

                <button style={CommonStyles.Button} onClick={this.addNewOrder}>
                    Add order
                </button>
            </div>
        );
    }
}

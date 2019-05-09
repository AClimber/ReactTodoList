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
                    name: 'ИП 1'
                },
                {
                    id: 2,
                    name: 'ИП 2'
                },
                {
                    id: 3,
                    name: 'ИП 3'
                }
            ],
            positionList: [
                {
                    id: 1,
                    name: 'Позиция 1',
                    category: {
                        id: 1,
                        name: 'Бумага',
                        attributes: [
                            {id: 1, name: 'Формат'},
                            {id: 2, name: 'Цвет'},
                            {id: 3, name: 'Толщина'}
                        ]
                    },
                    attribute: {id: 1, name: 'Формат'},
                    value: '100'
                },
                {
                    id: 2,
                    name: 'Позиция 2',
                    category: {
                        id: 1,
                        name: 'Бумага',
                        attributes: [
                            {id: 1, name: 'Формат'},
                            {id: 2, name: 'Цвет'},
                            {id: 3, name: 'Толщина'}
                        ]
                    },
                    attribute: {id: 2, name: 'Цвет'},
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
        const orderListElement: React.ReactNode = map(this.state.orderList, order => {
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
        const orderTable: React.ReactNode = this.state.orderList.length > 0
            ? (
                <table style = {CommonStyles.Table}>
                    <thead>
                        <tr>
                            <th style={CommonStyles.TableColumn}>Позиция</th>
                            <th style={CommonStyles.TableColumn}>Количество</th>
                            <th style={CommonStyles.TableColumn}>Клиент</th>
                            <th style={CommonStyles.TableColumn}>Цена</th>
                            <th style={CommonStyles.TableColumn}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderListElement}
                    </tbody>
                </table>
            )
            : null;

        return (
            <div className="container">
                {orderTable}

                <button style={CommonStyles.Button} onClick={this.addNewOrder}>
                    Добавить заказ
                </button>
            </div>
        );
    }
}

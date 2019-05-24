import * as React from 'react';

import {IOrderProps, IOrderState, IOrder, IClient} from './Order.interface';
import {filter, map} from 'lodash-es';
import {OrderItemComponent} from './orderItem/OrderItem.component';
import {CommonStyles} from '../../styles/Common.style';
import {IDataStorage} from '../../services/dataStorage/dataStorage.interface';
import {DataStorage} from '../../services/dataStorage/dataStorage.service';
import { DataStorageConstants } from '../../services/dataStorage/dataStorage.constant';

export class OrderComponent extends React.Component<IOrderProps, IOrderState> {
    private dataStorage: IDataStorage;

    constructor(props: IOrderProps) {
        super(props);

        this.state = {
            positionList: [],
            clientList: [],
            orderList: []
        };

        this.dataStorage = new DataStorage();

        this.addNewOrder = this.addNewOrder.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    componentWillMount(): void {
        //ToDo: get from BE
        const clientList: IClient[] = [
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
        ];

        this.setState({
            clientList: clientList,
            positionList: this.dataStorage.getData(DataStorageConstants.TABLE.POSITION) || [],
            orderList: this.dataStorage.getData(DataStorageConstants.TABLE.ORDER) || []
        });

        this.dataStorage.saveData(DataStorageConstants.TABLE.CLIENT, clientList);
    }

    private addNewOrder(): void {
        const newOrder: IOrder = {
            id: Date.now(),
            name: 'Неопределенное значение',
            positions: [],
            client: null,
            price: 0
        };

        this.setState({
            orderList: [...this.state.orderList, newOrder]
        }, this.saveOrder);
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
        }, this.saveOrder);
    }

    private onRemoveItem(id: number): void {
        this.setState({
            orderList: filter(this.state.orderList, position => {
                return position.id !== id;
            })
        }, this.saveOrder);
    }

    private saveOrder(): void {
        this.dataStorage.saveData(DataStorageConstants.TABLE.ORDER, this.state.orderList);
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
                            <th style={CommonStyles.TableColumn}>Название</th>
                            <th style={CommonStyles.TableColumn}>Позиция/Количество</th>
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

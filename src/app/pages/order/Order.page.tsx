import * as React from 'react';

import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";
import {OrderComponent} from '../../components/order/Order.component';

export class OrderPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="order-page">
                <h3>Страница формирования заказа</h3>
                <hr/>
                <OrderComponent/>
            </div>
        );
    }
}

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
            <div>
                <div>Order page</div>
                <hr/>
                <OrderComponent/>
            </div>
        );
    }
}

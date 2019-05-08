import { IPositionItem } from "../department/positionItem/PositionItem.interface";

export interface IOrderProps {}
export interface IOrderState {
    positionList: IPositionItem[],
    clientList: IClient[]
    orderList: IOrder[]
}

export interface IClient {
    id: number,
    name: string
}

export interface IOrder {
    id: number,
    position: IPositionItem
    client: IClient,
    amount: number,
    price: number
}
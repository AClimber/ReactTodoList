import { IOrder, IClient } from "../Order.interface";
import { IPositionItem } from "../../department/positionItem/PositionItem.interface";

export interface IOrderItemProps {
    item: IOrder,
    positionList: IPositionItem[],
    clientList: IClient[],
    onChangeItem: (item: IOrder) => void,
    onRemoveItem: (id: number) => void
}
export interface IOrderItemState {}
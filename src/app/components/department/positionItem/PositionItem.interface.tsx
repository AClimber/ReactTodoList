import {IAttribute, ICategory} from "../../dictionary/Dictionary.interface";

export interface IPositionItemState {}
export interface IPositionItemProps {
    item: IPositionItem;
    list: ICategory[];
}

export interface IPositionItem {
    id: number;
    name: string;
    category: ICategory;
    attribute: IAttribute;
    value: string;
}

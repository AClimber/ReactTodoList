import {IAttribute, ICategory} from "../../dictionary/Dictionary.interface";

export interface IPositionItemState {
}
export interface IPositionItemProps {
    item: IPositionItem;
    categoryList: ICategory[];
    onChangeItem: (item: IPositionItem) => void;
    onRemoveItem: (id: number) => void;
}

export interface IPositionItem {
    id: number;
    name: string;
    category: ICategory;
    attributes: IAttributeWithValue[];
    amount: number;
}

export interface IAttributeWithValue extends IAttribute {
    value: string;
}

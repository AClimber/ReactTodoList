import {IAttribute, ICategory} from "../../dictionary/Dictionary.interface";
import { IAttributeWithCatagory } from "../Department.interface";

export interface IPositionItemState {
}
export interface IPositionItemProps {
    item: IPositionItem;
    categoryList: ICategory[];
    attributeList: IAttributeWithCatagory[];
    onChangeItem: (item: IPositionItem) => void;
}

export interface IPositionItem {
    id: number;
    name: string;
    category: ICategory;
    attribute: IAttribute;
    value: string;
}

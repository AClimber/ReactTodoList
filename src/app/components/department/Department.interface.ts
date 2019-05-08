import {ICategory, IAttribute} from "../dictionary/Dictionary.interface";
import {IPositionItem} from "./positionItem/PositionItem.interface";

export interface IDepartmentState {
    categoryList: ICategory[],
    attributeList: IAttributeWithCatagory[],
    positionList: IPositionItem[];
}
export interface IDepartmentProps {
}

export interface IAttributeWithCatagory extends IAttribute {
    categoryId: number;
}
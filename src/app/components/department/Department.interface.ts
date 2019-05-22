import {ICategory} from "../dictionary/Dictionary.interface";
import {IPositionItem} from "./positionItem/PositionItem.interface";

export interface IDepartmentState {
    categoryList: ICategory[],
    positionList: IPositionItem[];
}
export interface IDepartmentProps {
}
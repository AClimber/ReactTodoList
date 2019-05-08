import {ICategory} from "./../dictionary/Dictionary.interface";

export interface ICustomSelectProps {
    selectedItemId: number|string,
    list: any,
    onChange:(option: any) => void,
    settings?: ICustomSelectSettings
}
export interface ICustomSelectState {
}

export interface IOption {
    value: number|string,
    label: string
}

export interface ICustomSelectSettings {
    isDisabled: boolean;
}
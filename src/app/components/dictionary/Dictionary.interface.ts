export interface IDictionaryState {
    categoryList: ICategory[];
}
export interface IDictionaryProps {}

export interface ICategory {
    id: number;
    name: string;
    attributes: IAttribute[];
}

export interface IAttribute {
    id: number;
    name: string;
}

import { ICategory } from '../Dictionary.interface';

export interface ICategoryItemProps {
    category: ICategory;
    onChange: (category: ICategory) => void;
    onRemove: (id: number) => void;
}

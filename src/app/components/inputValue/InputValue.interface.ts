export interface IInputValueProps {
    id?: number;
    value: string;
    onChange: (value: string, id?: number) => void;
    onRemove?: (id?: number) => void;
}

export interface IInputValueState {
    isEditMode: boolean;
}

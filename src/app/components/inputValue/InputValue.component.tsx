import * as React from 'react';

import {IInputValueState, IInputValueProps} from "./InputValue.interface";
import {get} from "lodash-es";

export class InputValueComponent extends React.Component<IInputValueProps, IInputValueState> {
    constructor(props: IInputValueProps) {
        super(props);

        this.state = {
            isEditMode: false
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onModeChange = this.onModeChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    private onValueChange(event: React.ChangeEvent): void {
        if (get(this.props, 'id')) {
            this.props.onChange(event.target['value'], this.props.id);
        } else {
            this.props.onChange(event.target['value']);
        }
    }

    private onRemove(): void {
        if (get(this.props, 'id')) {
            this.props.onRemove(this.props.id);
        } else {
            this.props.onRemove();
        }
    }

    private onModeChange(): void {
        this.setState({
            isEditMode: true
        });
    }

    private onBlur(): void {
        this.setState({
            isEditMode: false
        })
    }

    render(): React.ReactNode {
        const inputElement = this.state.isEditMode
            ? <input value={this.props.value} onChange={this.onValueChange} onBlur={this.onBlur}/>
            : <span>{this.props.value}</span>;
        const removeButtonStyle: React.CSSProperties = this.props.onRemove ? {} : {display: 'none'};
        return (
            <div>
                {inputElement}
                <button onClick={this.onModeChange} disabled={this.state.isEditMode}>Изменить</button>
                <button style={removeButtonStyle} onClick={this.onRemove}>Удалить</button>
            </div>
        );
    }
}

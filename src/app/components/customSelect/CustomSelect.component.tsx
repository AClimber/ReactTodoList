import * as React from 'react';

import {ICustomSelectProps, ICustomSelectState, IOption} from "./CustomSelect.interface";
import Select from "react-select";
import {get, map, find} from 'lodash-es';

export class CustomSelectComponent extends React.Component<ICustomSelectProps, ICustomSelectState> {
    constructor(props: ICustomSelectProps) {
        super(props);

        this.optionChange = this.optionChange.bind(this);
    }

    private optionChange(option: IOption): void {
        const selectedValue = find(this.props.list, ['id', option.value]);
        this.props.onChange(selectedValue);
    }

    private getOptionsList(data: any): IOption[] {
        return map(data, item => {
            return {value: item.id, label: item.name};
        });
    }

    render(): React.ReactNode {
        const options = this.getOptionsList(this.props.list);
        const selectedOption = this.props.selectedItemId ? find(options, {value: this.props.selectedItemId}): null;
        const isDisabled = get(this.props.settings, 'isDisabled', false);
        return (
            <Select
                value={selectedOption}
                onChange={this.optionChange}
                options={options}
                isDisabled={isDisabled}
            />
        );
    }
}
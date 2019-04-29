import * as React from 'react';
import { ReactNode } from "react";

/*Interfaces*/
import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";

/*Components*/
import {DictionaryComponent} from "../../components/dictionary/Dictionary.component";

export class DictionaryPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    componentWillMount(): void {}

    render(): ReactNode {
        return (
            <div>
                <div>Dictionary page</div>
                <hr/>
                <DictionaryComponent></DictionaryComponent>
            </div>
        );
    }
}

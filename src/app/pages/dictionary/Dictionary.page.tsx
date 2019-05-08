import * as React from 'react';
import {ReactNode} from "react";

import {
    IDefaultProps,
    IDefaultState
} from "../../interfaces/interfaces";
import {DictionaryComponent} from "../../components/dictionary/Dictionary.component";

export class DictionaryPage extends React.Component<IDefaultProps, IDefaultState> {
    constructor(props: IDefaultProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <h3>Dictionary page</h3>
                <hr/>
                <DictionaryComponent/>
            </div>
        );
    }
}

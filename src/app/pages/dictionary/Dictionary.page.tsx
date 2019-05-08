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
                <div>Dictionary page</div>
                <hr/>
                <DictionaryComponent/>
            </div>
        );
    }
}

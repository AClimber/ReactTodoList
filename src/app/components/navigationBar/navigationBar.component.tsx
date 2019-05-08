import * as React from 'react';
import {INavBarProps, INavBarState} from './navigationBar.interface';
import {map} from 'lodash-es';
import {NavLink} from "react-router-dom";
import {NavBarStyles} from './navigationBar.style';

export class NavigationBarComponent extends React.Component<INavBarProps, INavBarState> {
    constructor(props: INavBarProps) {
        super(props);
    }

    render(): React.ReactNode {
        const linksElement: React.ReactNode = 
            map(this.props.linkList, (link, index) => {
                return <li style={NavBarStyles.NavLi} key={index}>
                    <NavLink 
                        style={NavBarStyles.NavA}
                        activeStyle={NavBarStyles.NavAActive}
                        to={link.path}
                    >{link.label}</NavLink>
                </li>
            }); 
        return (
            <nav style={NavBarStyles.Nav}>
                <ul style={NavBarStyles.NavUl}>
                    {linksElement}
                </ul>
            </nav>
        );
    }
}
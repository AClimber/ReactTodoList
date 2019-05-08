export interface INavBarProps {
    linkList: ILink[];
}
export interface INavBarState {}

export interface ILink {
    path: string;
    label: string;
}
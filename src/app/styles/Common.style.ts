import {CSSProperties} from "react";
import {CommonVariable} from "./Common.variable";

const Button: CSSProperties = {
    border: '2px solid ' + CommonVariable.BorderColor,
    color: '#2a2a2a',
    backgroundColor: 'transparent',
    padding: '5px 15px',
    borderRadius: '5px',
    fontWeight: 600,
    outline: 'none'
};

const Container: CSSProperties = {
    padding: '20px',
    border: '1px solid ' + CommonVariable.BorderColor,
    borderRadius: '5px',
    position: 'relative',
    boxShadow: '3px 3px 0 0 rgba(235,238,242,.4)',
    marginBottom: '20px'
};

const Table: CSSProperties = {
    width: '100%',
    textAlign: 'center'
};

const TableColumn: CSSProperties = {
    width: '20%'
};

export const CommonStyles = {
    Button: Button,
    Container: Container,
    Table: Table,
    TableColumn: TableColumn
};

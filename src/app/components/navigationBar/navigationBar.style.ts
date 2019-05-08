import {CSSProperties} from "react";

const Nav: CSSProperties = {
    backgroundColor: "#dddddd"
};

const NavUl: CSSProperties = {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden"
};

const NavLi: CSSProperties = {
    float: "left"
};

const NavA: CSSProperties = {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "#2a2a2a"
}

const NavAActive: CSSProperties = {
    backgroundColor: "#4CAF50"
}

export const NavBarStyles = {
    Nav: Nav,
    NavUl: NavUl,
    NavLi: NavLi,
    NavA: NavA,
    NavAActive: NavAActive
};
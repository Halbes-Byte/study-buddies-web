import React from "react";
import "../../styles/navbar.css";
import {NavbarComponent} from "./NavbarComponent";
import {useLocation} from "react-router-dom";

export const NavbarButtons = () => {
    return (
        <>
            <NavbarComponent
                text="Home"
                path="/"
                isActive={IsActive("/")}
            />
            <span className="navbar-separator sm:p-5 p-0">|</span>
            <NavbarComponent
                text="Kalender"
                path="/calender"
                isActive={IsActive("/calender")}
            />
            <span className="navbar-separator sm:p-5 p-0">|</span>
            <NavbarComponent
                text="Score"
                path="/score"
                isActive={IsActive("/score")}
            />
            <span className="navbar-separator sm:p-5 p-0">|</span>
            <NavbarComponent
                text="Dein Studium"
                path="/settings"
                isActive={IsActive("/settings")}
            />
        </>
    );
};

function IsActive(path: string): boolean {
    const location = useLocation();
    return location.pathname === path;
}

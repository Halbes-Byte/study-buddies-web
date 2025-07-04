import React from "react";
import {NavbarComponent} from "./NavbarComponent";
import {useLocation} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {IconButton} from "@mui/material";
import keycloak from "../../Keycloak";

export const NavbarButtons = () => {
    const logout = () => {
        keycloak.logout({
            redirectUri: 'http://localhost:3000'
        });
    };

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
            <span className="navbar-separator sm:p-5 p-0">|</span>
            <IconButton onClick={logout}>
                <LogoutIcon sx={{fontSize: 15}} className="text-[#949494] hover:text-[#56A095] hover:text-lg"/>
            </IconButton>
        </>
    );
};

function IsActive(path: string): boolean {
    const location = useLocation();
    return location.pathname === path;
}

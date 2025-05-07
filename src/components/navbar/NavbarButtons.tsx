import React, {useEffect, useState} from "react";
import "../../styles/navbar.css";
import {NavbarComponent} from "./NavbarComponent";
import {useLocation} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {IconButton} from "@mui/material";
import axiosInstance from "../../AxiosConfig";
import {getUser} from "../../api/UserApi";
import {UserDto} from "../../dtos/UserDto";
import keycloak from "../../Keycloak";

export const NavbarButtons = () => {
    const axios = axiosInstance;
    const [user, setUser] = useState<UserDto>();

    const fetchUser = async () => {
        const userData = await getUser(axios);
        setUser(userData);
    };

    useEffect(() => {
        fetchUser();
    }, [])

    const logout = () => {
        fetchUser()
        if (user?.uuid) {
            const keycloakUrl = `http://localhost:7070/realms/study-buddies/users/${user?.uuid}/logout`;
            axios.post(keycloakUrl, {}, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                }
            });
        } else {
            console.error("Digga, userId ist undefined.");
        }
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

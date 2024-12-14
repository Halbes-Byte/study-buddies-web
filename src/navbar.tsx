import React from 'react';
import './navbar.css';
import pinguin from './data/penguin-48226_1280.svg';
import {NavbarComponent} from "./components/NavbarComponent";
import {useLocation} from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="flex justify-self-start">
                <a href="/#/study-buddies-web/">
                    <img className="picture" src={pinguin} alt="Pinguin"/>
                </a>
            </div>

            <div className="navbar-right">
                <div className="navbar-flex">
                    <div className="navbar-links">
                        <NavbarComponent text={"Home"} path={"/#/study-buddies-web/"} isActive={IsActive("home")}/>
                        <span className="navbar-separator">|</span>
                        <NavbarComponent text={"Kalender"} path={"/#/study-buddies-web/calendar"} isActive={IsActive("calendar")}/>
                        <span className="navbar-separator">|</span>
                        <NavbarComponent text={"Score"} path={"/#/study-buddies-web/score"} isActive={IsActive("score")}/>
                        <span className="navbar-separator">|</span>
                        <NavbarComponent text={"Aktuelles"} path={"/#/study-buddies-web/current"} isActive={IsActive("current")}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

function IsActive(path: string): boolean {
    const location = useLocation();
    if(location.pathname.endsWith("study-buddies-web/") && path === "home")
        return true;

    return location.pathname.includes(path);
}
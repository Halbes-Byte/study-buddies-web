import React from "react";
import "./navbar.css";
import pinguin from "./data/penguin-48226_1280.svg";
import { NavbarComponent } from "./components/NavbarComponent";
import { useLocation, Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="flex justify-self-start">
                <Link to="/">
                    <img className="picture" src={pinguin} alt="Pinguin" />
                </Link>
            </div>

            <div className="navbar-right">
                <div className="navbar-flex">
                    <div className="navbar-links">
                        <NavbarComponent
                            text="Home"
                            path="/"
                            isActive={IsActive("/")}
                        />
                        <span className="navbar-separator">|</span>
                        <NavbarComponent
                            text="Kalender"
                            path="/calender"
                            isActive={IsActive("/calender")}
                        />
                        <span className="navbar-separator">|</span>
                        <NavbarComponent
                            text="Score"
                            path="/score"
                            isActive={IsActive("/score")}
                        />
                        <span className="navbar-separator">|</span>
                        <NavbarComponent
                            text="Aktuelles"
                            path="/current"
                            isActive={IsActive("/current")}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

function IsActive(path: string): boolean {
    const location = useLocation();
    return location.pathname === path;
}

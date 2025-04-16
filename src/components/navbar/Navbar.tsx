import React from "react";
import "../../styles/navbar.css";
import pinguin from "../../data/penguin-48226_1280.svg";
import {Link} from "react-router-dom";
import {NavbarButtons} from "./NavbarButtons";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="flex justify-self-start md:ml-20 ml-4">
                <Link to="/">
                    <img className="picture" src={pinguin} alt="Pinguin"/>
                </Link>
            </div>
            <div className="md:mr-20 mr-4">
                <div className="navbar-flex">
                    <div className="navbar-links">
                        <NavbarButtons/>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;

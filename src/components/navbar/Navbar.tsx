import React from "react";
import pinguin from "../../data/penguin-48226_1280.svg";
import {Link} from "react-router-dom";
import {NavbarButtons} from "./NavbarButtons";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-[#151821] text-[#949494] h-[65px]">
            <div className="flex justify-self-start md:ml-20 ml-4">
                <Link to="/">
                    <img className="h-[40px] invert" src={pinguin} alt="Pinguin"/>
                </Link>
            </div>
            <div className="md:mr-20 mr-4">
                <div className="flex justify-between items-center relative">
                    <div className="flex items-center gap-2.5">
                        <NavbarButtons/>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;

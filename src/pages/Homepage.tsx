import '../index.css';
import logo from '../data//halbesByte.jpeg';
import React from "react";
import {Link} from "react-router-dom";

export default function Homepage() {
    return (
        <div className="relative">
            <Link to="">
                <img className="absolute top-20 left-20 z-60 h-10" src={logo} alt={"back to homepage"}/>
            </Link>
            <div className="flex justify-center items-center h-screen ">
                <div className="grid row grid-rows-2 gap-5">

                <div className="flex flex-row justify-between gap-10">
                    <h1 className="text-7xl font-bold text-gray-300">Study-Buddies</h1>
                    <img className="h-20" src={logo} alt={""}/>
                </div>
                <p className="text-xl font-medium text-gray-300">Finde deinen Study-Buddy für deine Study-Party</p>
                </div>

            </div>
        </div>
    );
}
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
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-7xl text-gray-300">Study-Buddies</h1>
            </div>
        </div>
    );
}
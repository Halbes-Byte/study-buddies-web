import pinguin from "../data/penguin-48226_1280.svg";
import React from "react";

export default function Page404() {
    return (
        <div className="h-screen relative items-center justify-center justify-items-center flex flex-col">
            <h1 className="text-7xl font-bold text-gray-300">404 Page not Found</h1>
            <img className="h-[70%]" src={pinguin} alt="Pinguin"/>
        </div>
    )
}
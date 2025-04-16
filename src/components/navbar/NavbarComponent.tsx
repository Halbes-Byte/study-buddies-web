import React from "react";
import {Link} from "react-router-dom";

export function NavbarComponent(props: {
    text: string;
    path: string;
    isActive: boolean;
}) {
    let className = "sm:p-2 hover:text-[#56A095] hover:font-bold focus:text-[#56A095] focus:font-bold";
    if (props.isActive) {
        className += " text-[#56A095] font-bold";
    } else {
        className += " text-[#949494]";
    }
    return (
        <Link to={props.path} className={className}>
            <div className="md:text-lg sm:text-base text-sm">{props.text}</div>
        </Link>
    )
}
import React from "react";

export function NavbarComponent(props: {
    text: string;
    path: string;
    isActive: boolean;
}) {
    let className = "text-[15px] p-2 hover:text-[#56A095] hover:font-bold focus:text-[#56A095] focus:font-bold";
    if(props.isActive) {
        className += " text-[#56A095] font-bold";
    } else {
        className += " text-[#949494]";
    }
    return (
        <a href={props.path} className={className}>
            <div className="text-lg">{props.text}</div>
        </a>
    )
}
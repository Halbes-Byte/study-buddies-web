import React from "react";

export function CuteButton(props: {
    bgColor: string;
    textColor: string;
    text: string;
    onClick?: () => void | undefined;
    size?: string | undefined;
}) {
    const textSize = props.size || "text-xl";
    const className = `px-5 py-1 rounded-full transform transition-all duration-300` +
        `hover:scale-x-105 hover:scale-y-105 ${textSize}`;
    return (
        <button
            className={className}
            style={{background: props.bgColor, color: props.textColor}}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

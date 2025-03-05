import React from "react";

export function CuteButton(props: {
    bgColor: string;
    textColor: string;
    text: string;
    onClick?: () => void | undefined | Promise<void>;
    classname?: string | undefined;
}) {
    const className = `px-5 py-2 h-fit rounded-full transform transition-all duration-300` +
        `hover:scale-x-105 hover:scale-y-105 ${props.classname}`;
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

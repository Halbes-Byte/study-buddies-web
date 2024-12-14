import React from "react";

export function CuteButton(props: {
    bgColor: string;
    textColor: string;
    text: string;
    onClick?: () => void | undefined
}) {
    return (
        <button
            className='px-5 py-1 text-xl rounded-full transform transition-all duration-300 hover:scale-x-110'
            style={{background: props.bgColor, color: props.textColor}}
            onClick={props.onClick}>
            {props.text}
        </button>
    )
}

import '../index.css';
import React from "react";
import beispielbild from '../data//beispielbild_score.png';

export default function Score() {
    return (
        <div className="flex flex-col">
            <img src={beispielbild} alt="Score Bild" className="w-2/3"/>
        </div>
    );
}


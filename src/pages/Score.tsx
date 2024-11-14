import '../index.css';
import React from "react";
import beispielbild from '../data//beispielbild_score.png';
import {Link} from "react-router-dom";

import './Score.css';

export default function Score() {
    return (
        
        <div className="centered-container">
        <img src={beispielbild} alt="Score Bild" className="centered-image" />
      </div>

    );
}


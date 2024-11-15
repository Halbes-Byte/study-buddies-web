import React from 'react';
import './navbar.css';
import pinguin from './data/penguin-48226_1280.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="flex justify-self-start">
                <a href="/#/study-buddies-web/">
                    <img className="picture" src={pinguin} alt="Pinguin"/>
                </a>
            </div>

            <div className="navbar-right">
                <div className="navbar-flex">
                    <div className="navbar-links">
                        <a href="/#/study-buddies-web/" className="navbar-link">
                            <div className="text-lg">Home</div>
                        </a>
                        <span className="navbar-separator">|</span>
                        <a href="/#/study-buddies-web/calendar" className="navbar-link">
                            <div className="text-lg">Kalender</div>
                        </a>
                        <span className="navbar-separator">|</span>
                        <a href="/#/study-buddies-web/score" className="navbar-link">
                            <div className="text-lg">Score</div>
                        </a>
                        <span className="navbar-separator">|</span>
                        <a href="/#/study-buddies-web/current" className="navbar-link">
                            <div className="text-lg">Aktuelles</div>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

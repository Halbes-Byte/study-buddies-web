import React from 'react';
import './navbar.css';
import pinguin from './data/penguin-48226_1280.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="picture" src={pinguin} alt="Pinguin" />
      </div>

      <div className="navbar-right">
        <div className="navbar-flex">
          <div className="navbar-links">
            <a href="/pages/Homepage" className="navbar-link">Home</a>
            <span className="navbar-separator">|</span>
            <a href="/pages/Kalender" className="navbar-link">Kalender</a>
            <span className="navbar-separator">|</span>
            <a href="/pages/Score" className="navbar-link">Score</a>
            <span className="navbar-separator">|</span>
            <a href="/pages/Aktuelles" className="navbar-link">Aktuelles</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
            <a href="/" className="navbar-link">Home</a>
            <span className="navbar-separator">|</span>
            <a href="/calendar" className="navbar-link">Kalender</a>
            <span className="navbar-separator">|</span>
            <a href="/score" className="navbar-link">Score</a>
            <span className="navbar-separator">|</span>
            <a href="/current" className="navbar-link">Aktuelles</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

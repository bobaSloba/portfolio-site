// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Slobodan.dev</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

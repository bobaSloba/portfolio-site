// src/components/Hero.jsx
import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Slobodan Jevtić</h1>
        <p className="hero-subtitle">Self-Taught Developer | Python & React Enthusiast</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn primary">View Projects</a>
          <a href="#contact" className="btn secondary">Contact Me</a>
        </div>
      </div>
    </div>
  );
}

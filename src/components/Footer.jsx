// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Slobodan Jevtić — Built with React & Vite</p>
        <div className="socials">
          <a href="https://github.com/slobodanjevtic" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/slobodanjevtic" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {/* Add more if needed */}
        </div>
      </div>
    </footer>
  );
}

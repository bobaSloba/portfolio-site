// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css';
import Reveal from './reveal'; // Assuming this is correctly imported
import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

export default function Hero() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null; // Don't render until initialized

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '80vh' }}> {/* Fixed height for containment */}
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false }, // Prevent full-screen takeover
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#007bff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 }, random: true, anim: { enable: false } },
            links: { enable: true, distance: 150, color: '#007bff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, outModes: { default: 'bounce' } } // Destroy escaped particles
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 200, duration: 0.4 }, push: { quantity: 4 } }
          },
          detectRetina: true
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} // Allow clicks through
      />
      <div className="hero">
        <div className="hero-content">
          <Reveal>
            <h1 className="hero-title">Hi, I'm Slobodan Jevtić</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="hero-subtitle">Self-Taught Developer | Python & React Enthusiast</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary">View Projects</a>
              <a href="#contact" className="btn secondary">Contact Me</a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
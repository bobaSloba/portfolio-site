// src/components/About.jsx
import React from 'react';
import './About.css';
import profileImage from '../assets/profile.jpg'; // replace with your image or use placeholder

export default function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I'm Slobodan Jevtić, a self-taught developer with a background in Business Economics. After realizing my true passion lies in building and solving problems with code, I began my journey into the world of development.
          </p>
          <p>
            My current focus is on Python scripting, React front-end development, and exploring blockchain technology. I’m committed to constant learning, growth, and building tools that bring ideas to life.
          </p>
          <p>
            In my free time, I enjoy running, optimizing my daily routines, and working on personal projects that challenge me to grow as both a developer and a person.
          </p>
        </div>

        <div className="about-image">
          <img src={profileImage} alt="Slobodan Jevtić" />
        </div>
      </div>
    </div>
  );
}

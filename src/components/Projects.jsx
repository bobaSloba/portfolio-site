// src/components/Projects.jsx
import React from 'react';
import './Projects.css';

const projects = [
  {
    title: "Life Tracker App",
    description: "A Tkinter-based Python GUI app to track daily habits like sleep, calories, workouts, and runs with graphs and SQLite storage.",
    tags: ["Python", "Tkinter", "SQLite", "Matplotlib"],
    liveLink: "#",  // Add a real link if deployed
    githubLink: "https://github.com/slobodanjevtic/life-tracker"
  },
  {
    title: "Crypto Wallet Explorer",
    description: "A blockchain tool to trace wallet transactions using public data. Built with React and styled for a faceless YouTube channel.",
    tags: ["React", "Blockchain", "Solana", "KYT"],
    liveLink: "#",
    githubLink: "https://github.com/slobodanjevtic/chainlens"
  },
  {
    title: "Personal Portfolio",
    description: "This very portfolio site. Built using React + Vite, with scroll navigation, dark mode, and clean component structure.",
    tags: ["React", "Vite", "CSS"],
    liveLink: "#",
    githubLink: "https://github.com/slobodanjevtic/portfolio"
  }
];

export default function Projects() {
  return (
    <div className="projects">
      <div className="projects-container">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn primary">Live</a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn secondary">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

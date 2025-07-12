import React, { useState, useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [stars, setStars] = useState(0);
  useEffect(() => {
    fetch(`https://api.github.com/repos/${project.githubLink.split('github.com/')[1]}`)
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count || 0));
  }, [project]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', maxWidth: '500px', textAlign: 'center', color: 'black' }}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <img src={project.screenshot} alt="Screenshot" style={{ width: '100%', margin: '10px 0' }} loading="lazy" /> {/* Add screenshot URL to projects array */}
        <p>Tech: {project.tags.join(', ')}</p>
        <p>GitHub Stars: {stars}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
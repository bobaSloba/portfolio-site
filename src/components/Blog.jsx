// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import Reveal from './reveal';
import "./Projects.css";  
import VanillaTilt from 'vanilla-tilt';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://dev.to/feed/econdev')  
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'text/xml'))
      .then(data => {
        const items = data.querySelectorAll('item');
        const parsedPosts = Array.from(items).slice(0, 3).map(item => ({
          title: item.querySelector('title').textContent,
          link: item.querySelector('link').textContent,
          description: item.querySelector('description').textContent.slice(0, 150).trim() + '...'
        }));
        setPosts(parsedPosts);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      VanillaTilt.init(card, {
        max: 15,  // Tilt angle
        speed: 400,  // Speed of tilt
        glare: true,  // Shiny glare effect
        'max-glare': 0.5  // Glare intensity
      });
    });
  }, []);

  return (
    <div className="projects" id="blog">
      <div className="projects-container">
        <Reveal><h2>Blog Posts from DEV.to</h2></Reveal>
        <div className="project-grid">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="project-card">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="project-links">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="btn primary">Read More</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="view-more" style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="https://dev.to/econdev" target="_blank" rel="noopener noreferrer" className="btn primary">View More on DEV.to</a>
        </div>
      </div>
    </div>
  );
}
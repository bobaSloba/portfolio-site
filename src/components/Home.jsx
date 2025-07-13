import { useState, useEffect } from 'react';
import '../App.css'; // Adjust if your CSS import path changes
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer'; // Note: You had 'Footer' in your pasted code—assuming it's Footer
import TicTacToe from './TicTacToe';
import Blog from './Blog';

function Home() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let current = [];
    const handleKeyDown = (e) => {
      current = [...current, e.code].slice(-10);
      if (current.join(',') === konamiCode.join(',')) {
        setShowGame(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
      <section id="blog"><Blog /></section>
      <section id="contact"><Contact /></section>
      <Footer />
      {showGame && <TicTacToe onClose={() => setShowGame(false)} />}
    </div>
  );
}

export default Home;
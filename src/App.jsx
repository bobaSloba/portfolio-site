import { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <section id="hero"><Hero /></section>
      <section id="about"><About /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><Contact /></section><section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}


export default App;



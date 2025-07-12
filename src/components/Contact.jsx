// src/components/Contact.jsx
import React from 'react';
import './Contact.css';
import Reveal from './reveal';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-container">
      <Reveal>
        <h2>Contact Me</h2>
        </Reveal>
        <Reveal delay={0.2}>
        <p>You can reach me anytime at:</p>
        </Reveal>
        <Reveal delay={0.4}>
        <form
          action="https://formspree.io/f/xqabvjnn" // Replace with your own Formspree form ID
          method="POST"
          className="contact-form"
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required />
          <button type="submit" className="btn primary">Send Message</button>
        </form>
        </Reveal>
      </div>
    </div>
  );
}

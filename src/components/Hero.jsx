function Hero() {
    return (
      <header className="hero" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Slobodan Jevtić</h1>
          <img
  src="/logo.png"
  alt="Slobodan Jevtić's Logo"
  style={{
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
    borderRadius: '50%',
    border: '2px solid white'
  }}
/>

          <h2>@bobaSloba</h2>
        </div>
        <ul>
          <li>Learning in public</li>
          <li>Building in Python</li>
          <li>Web & Crypto</li>
        </ul>
      </header>
    );
  }
  
  export default Hero;
  
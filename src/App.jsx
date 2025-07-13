import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Your new Home component
import CryptoTool from './components/CryptoTool'; // The new component (create this next)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto-tool" element={<CryptoTool />} />
      </Routes>
    </Router>
  );
}

export default App;
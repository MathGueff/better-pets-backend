import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <div className="logo-dot"></div>
        <span className="logo-text">ForestRanger</span>
      </div>
      
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">How It Works</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
      </nav>

      <button className="btn-donate">
        DONATE
      </button>
    </header>
  );
};

export default Header;

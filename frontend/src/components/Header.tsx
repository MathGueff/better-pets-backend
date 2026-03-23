import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <nav className="nav-links">
        <a href="#">HOME</a>
        <a href="#">BLOG</a>
        <a href="#">FAQ</a>
        <a href="#">ABOUT US</a>
      </nav>

      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <div className="social-links" style={{ display: 'flex', gap: '16px', marginLeft: '24px' }}>
        <span style={{ opacity: 0.6 }}>f</span>
        <span style={{ opacity: 0.6 }}>t</span>
        <span style={{ opacity: 0.6 }}>i</span>
      </div>
    </header>
  );
};

export default Header;

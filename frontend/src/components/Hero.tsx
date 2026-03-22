import React from 'react';

interface HeroProps {
  onAddClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAddClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-accent"></div>
      <h1 className="hero-title">
        Wildlife <br /> Conservation
      </h1>
      <p className="hero-description">
        Wildlife conservation is the practice of protecting wild species and their habitats in order to prevent species from going extinct.
      </p>
      <button 
        onClick={onAddClick}
        className="btn-primary"
      >
        Cadastrar Animal <span style={{ fontSize: '18px' }}>→</span>
      </button>
    </section>
  );
};

export default Hero;

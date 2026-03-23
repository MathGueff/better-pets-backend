import React from 'react';

interface HeroProps {
  onAddClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAddClick }) => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        <span className="title-primary">ENJOY</span>
        <span className="title-secondary">NATURE</span>
      </h1>
      <p className="hero-description">
        Venha e registre os seus amiguinhos aquiii
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={onAddClick}
          className="btn-primary"
        >
          Cadastrar amiguinho
        </button>
      </div>
    </section>
  );
};

export default Hero;

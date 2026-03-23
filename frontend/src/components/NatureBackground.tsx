import React from 'react';

const NatureBackground: React.FC = () => {
  return (
    <div className="nature-bg">
      <div className="nature-bg-layer dark-base"></div>
      <div className="nature-bg-layer botanical-asset"></div>
      <div className="nature-bg-layer shadow-overlay"></div>
      <div className="nature-bg-layer white-wave">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 800V350C200 250 400 500 700 450C1000 400 1200 150 1440 250V800H0Z" fill="white" />
        </svg>
      </div>
      <div className="nature-bg-layer botanic-elements">
        <div className="leaf leaf-1"></div>
        <div className="leaf leaf-2"></div>
        <div className="leaf leaf-3"></div>
        <div className="leaf leaf-4"></div>
        <div className="leaf leaf-5"></div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .nature-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          background-color: var(--primary-dark);
        }
        .nature-bg-layer {
          position: absolute;
          inset: 0;
        }
        .botanical-asset {
          background-image: url('/botanical-bg.png');
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          mix-blend-mode: soft-light;
          filter: contrast(1.2) brightness(0.8);
        }
        .shadow-overlay {
          background: linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%);
          z-index: 1;
        }
        .white-wave {
          bottom: 0;
          top: auto;
          height: 60%;
        }
        .white-wave svg {
          width: 100%;
          height: 100%;
        }
        .leaf {
          position: absolute;
          background: var(--primary-light);
          border-radius: 50% 0 50% 0;
          opacity: 0.6;
          filter: blur(1px);
        }
        .leaf-1 { width: 150px; height: 250px; top: 10%; right: 10%; transform: rotate(45deg); background: var(--primary-medium); }
        .leaf-2 { width: 100px; height: 200px; top: 20%; right: 25%; transform: rotate(-15deg); background: var(--primary-light); }
        .leaf-3 { width: 80px; height: 160px; bottom: 20%; left: 10%; transform: rotate(30deg); background: var(--accent-teal); }
        .leaf-4 { width: 120px; height: 220px; bottom: 10%; right: 5%; transform: rotate(-30deg); background: var(--primary-medium); }
        .leaf-5 { width: 60px; height: 120px; top: 5%; left: 15%; transform: rotate(60deg); background: var(--accent-lime); }
        
        @keyframes sway {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        .botanic-elements div {
          animation: sway 10s ease-in-out infinite;
          transform-origin: bottom center;
        }
      ` }} />
    </div>
  );
};

export default NatureBackground;

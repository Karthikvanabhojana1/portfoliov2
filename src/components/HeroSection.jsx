import React from 'react';

const HeroSection = ({ personalInfo, navigateToSection }) => {
  // Direct navigation function as fallback
  const handleNavigation = (sectionId) => {
    console.log(`Attempting to navigate to: ${sectionId}`);
    
    if (navigateToSection) {
      console.log('Using navigateToSection function');
      navigateToSection(sectionId);
    } else {
      console.log('Using direct scroll fallback');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error(`Section ${sectionId} not found`);
      }
    }
  };

  return (
    <section id="home" className="hero" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ zIndex: 2, animation: 'fadeInUp 1s ease-out', maxWidth: '1200px', padding: '0 2rem' }}>
        <h1>{personalInfo.name}</h1>
        <p className="subtitle">{personalInfo.title}</p>
        <div style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(203, 213, 225, 0.9)', 
          marginBottom: '3rem', 
          opacity: 0, 
          animation: 'fadeInUp 1s ease-out 0.8s both',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}>
          MS Student at Northeastern University | {personalInfo.location}
        </div>
        <div className="cta-buttons">
          <button onClick={() => handleNavigation('projects')} className="btn btn-primary">
            <span>Explore Projects</span>
          </button>
          <button onClick={() => handleNavigation('contact')} className="btn btn-secondary">
            <span>Get In Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
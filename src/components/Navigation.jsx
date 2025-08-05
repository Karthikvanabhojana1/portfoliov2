import React from 'react';
import SearchBox from './SearchBox';

const Navigation = ({ 
  activeSection, 
  navigateToSection, 
  searchQuery, 
  searchResults, 
  showSearchResults, 
  handleSearch 
}) => {
  const navSections = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'experience', label: 'Experience' },
    { key: 'tech', label: 'Tech Stack' },
    { key: 'projects', label: 'Projects' },
    { key: 'footer', label: 'Contact' }
  ];

  const handleNavClick = (section) => {
    console.log(`Navigating to: ${section}`); // Debug log
    console.log('navigateToSection function:', navigateToSection); // Check if function exists
    console.log('Current activeSection:', activeSection); // Check current state
    
    if (navigateToSection && typeof navigateToSection === 'function') {
      navigateToSection(section);
    } else {
      console.error('navigateToSection is not a function or is undefined');
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1.5rem 2rem',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div 
          className="logo" 
          onClick={() => handleNavClick('home')}
          style={{
            fontSize: '2rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          KV
        </div>
        
        <ul className="nav-links" style={{
          display: 'flex',
          listStyle: 'none',
          gap: '2rem',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }}>
          {navSections.map(section => (
            <li key={section.key}>
              <button 
                onClick={() => handleNavClick(section.key)} 
                className={`nav-button ${activeSection === section.key ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === section.key ? '#6366f1' : 'rgba(203, 213, 225, 0.9)',
                  fontSize: '1rem',
                  fontWeight: activeSection === section.key ? 600 : 500,
                  cursor: 'pointer',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.key) {
                    e.target.style.color = '#8b5cf6';
                    e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.key) {
                    e.target.style.color = 'rgba(203, 213, 225, 0.9)';
                    e.target.style.background = 'none';
                  }
                }}
              >
                {section.label}
                {activeSection === section.key && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            </li>
          ))}
        </ul>
        
        <SearchBox 
          searchQuery={searchQuery}
          searchResults={searchResults}
          showSearchResults={showSearchResults}
          handleSearch={handleSearch}
          navigateToSection={navigateToSection}
        />
      </div>
    </nav>
  );
};

export default Navigation;
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
        <div className="logo" onClick={() => navigateToSection('home')}>
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
          {['home', 'about', 'experience', 'tech', 'projects', 'contact'].map(section => (
            <li key={section}>
              <button 
                onClick={() => navigateToSection(section)} 
                className={`nav-button ${activeSection === section ? 'active' : ''}`}
              >
                {section === 'tech' ? 'Tech Stack' : section.charAt(0).toUpperCase() + section.slice(1)}
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
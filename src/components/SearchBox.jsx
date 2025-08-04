// components/SearchBox.jsx
import React, { useEffect } from 'react';

const SearchBox = ({ 
  searchQuery, 
  searchResults, 
  showSearchResults, 
  handleSearch, 
  navigateToSection 
}) => {
  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        // This would need to call a function to hide results
        // setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-container" style={{ position: 'relative', marginLeft: '2rem' }}>
      <input
        type="text"
        className="search-box"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search portfolio..."
        style={{
          padding: '0.875rem 1.25rem',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '25px',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#f8fafc',
          outline: 'none',
          transition: 'all 0.4s ease',
          width: '250px',
          backdropFilter: 'blur(10px)',
          fontSize: '1rem'
        }}
      />
      
      {showSearchResults && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(15, 23, 42, 0.97)',
          backdropFilter: 'blur(25px)',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '20px',
          marginTop: '0.75rem',
          maxHeight: '450px',
          overflowY: 'auto',
          zIndex: 1001,
          animation: 'slideInUp 0.4s ease-out',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
        }}>
          {searchResults.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(203, 213, 225, 0.7)' }}>
              <div style={{ fontSize: '1.1rem' }}>No results found</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                Try searching for "Java", "Projects", or "Experience"
              </div>
            </div>
          ) : (
            searchResults.map((item, index) => (
              <SearchResult
                key={index}
                item={item}
                index={index}
                totalResults={searchResults.length}
                navigateToSection={navigateToSection}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const SearchResult = ({ item, index, totalResults, navigateToSection }) => {
  return (
    <div
      onClick={() => navigateToSection(item.section)}
      style={{
        padding: '1.5rem',
        borderBottom: index < totalResults - 1 ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#f59e0b', 
        textTransform: 'uppercase', 
        fontWeight: 700, 
        marginBottom: '0.5rem',
        letterSpacing: '1px'
      }}>
        {item.category} {item.level && `• ${item.level}`}
      </div>
      <div style={{ 
        fontWeight: 700, 
        color: '#6366f1', 
        marginBottom: '0.75rem', 
        fontSize: '1.1rem' 
      }}>
        {item.title}
      </div>
      <div style={{ 
        fontSize: '0.95rem', 
        color: 'rgba(203, 213, 225, 0.8)', 
        lineHeight: 1.5 
      }}>
        {item.description.substring(0, 150)}...
      </div>
    </div>
  );
};

export default SearchBox;
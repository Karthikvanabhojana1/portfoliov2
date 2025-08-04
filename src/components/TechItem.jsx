// components/TechItem.jsx
import React from 'react';

const TechItem = ({ tech }) => {
  return (
    <div className="tech-item">
      <TechIcon icon={tech.icon} />
      <TechTitle title={tech.title} />
      <TechBadges level={tech.level} years={tech.years} />
      <TechDescription description={tech.description} />
    </div>
  );
};

const TechIcon = ({ icon }) => {
  return (
    <i className={icon} style={{
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      color: 'var(--accent)',
      animation: 'bounce 3s infinite',
      transition: 'all 0.3s ease'
    }}></i>
  );
};

const TechTitle = ({ title }) => {
  return (
    <h3 style={{ 
      marginBottom: '1rem', 
      color: '#6366f1', 
      fontSize: '1.5rem', 
      fontWeight: 700 
    }}>
      {title}
    </h3>
  );
};

const TechBadges = ({ level, years }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '1rem', 
      marginBottom: '1.5rem' 
    }}>
      <span style={{ 
        background: 'rgba(16, 185, 129, 0.2)', 
        color: '#10b981', 
        padding: '0.5rem 1rem', 
        borderRadius: '20px', 
        fontSize: '0.85rem',
        fontWeight: 600,
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        {level}
      </span>
      <span style={{ 
        background: 'rgba(245, 158, 11, 0.2)', 
        color: '#f59e0b', 
        padding: '0.5rem 1rem', 
        borderRadius: '20px', 
        fontSize: '0.85rem',
        fontWeight: 600,
        border: '1px solid rgba(245, 158, 11, 0.3)'
      }}>
        {years} exp
      </span>
    </div>
  );
};

const TechDescription = ({ description }) => {
  return (
    <p style={{ 
      fontSize: '1rem', 
      color: 'rgba(248, 250, 252, 0.85)', 
      lineHeight: 1.7 
    }}>
      {description}
    </p>
  );
};

export default TechItem;
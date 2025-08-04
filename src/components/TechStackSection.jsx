// components/TechStackSection.jsx
import React from 'react';
import TechItem from './TechItem';

const TechStackSection = ({ techStack }) => {
  return (
    <section id="tech" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="section-title">My Technology Stack & Skills</h2>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.3rem', 
        marginBottom: '5rem', 
        color: 'rgba(203, 213, 225, 0.9)', 
        maxWidth: '800px', 
        margin: '0 auto 5rem', 
        lineHeight: 1.7 
      }}>
        Cutting-edge technologies I use to build modern, scalable applications with proven expertise levels
      </p>
      <div className="tech-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem', 
        marginTop: '3rem' 
      }}>
        {techStack.map((tech, index) => (
          <TechItem key={index} tech={tech} />
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
// components/ExperienceSection.jsx
import React from 'react';
import ExperienceCard from './ExperienceCard';

const ExperienceSection = ({ experiences }) => {
  return (
    <section id="experience" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="section-title">Professional Experience</h2>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.3rem', 
        marginBottom: '5rem', 
        color: 'rgba(203, 213, 225, 0.9)', 
        maxWidth: '800px', 
        margin: '0 auto 5rem', 
        lineHeight: 1.7 
      }}>
        My journey through the tech industry, building innovative solutions and achieving measurable impact
      </p>
      
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
// components/ExperienceCard.jsx
import React from 'react';

const ExperienceCard = ({ experience, index }) => {
  return (
    <div className="experience-item">
      {/* Date Badge positioned across the timeline */}
      <div className="experience-date-badge">
        {experience.duration}
      </div>
      
      <div className="experience-content">
        <ExperienceHeader experience={experience} />
        <ExperienceDescription experience={experience} />
        <AchievementsList achievements={experience.achievements} />
        <TechnologiesUsed technologies={experience.technologies} />
      </div>
      <div className="experience-dot"></div>
    </div>
  );
};

const ExperienceHeader = ({ experience }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#6366f1', 
        marginBottom: '0.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        flexWrap: 'wrap' 
      }}>
        <span>{experience.company}</span>
        <span style={{ 
          fontSize: '1rem', 
          color: 'rgba(203, 213, 225, 0.7)', 
          fontWeight: 500 
        }}>
          • {experience.location}
        </span>
      </div>
      <div style={{ 
        fontSize: '1.4rem', 
        color: '#f59e0b', 
        marginBottom: '0.5rem', 
        fontWeight: 600 
      }}>
        {experience.role}
      </div>
    </div>
  );
};

const ExperienceDescription = ({ experience }) => {
  return (
    <div style={{ 
      marginBottom: '2rem', 
      lineHeight: 1.8, 
      fontSize: '1.05rem', 
      color: 'rgba(248, 250, 252, 0.9)' 
    }}>
      {experience.description}
    </div>
  );
};

const AchievementsList = ({ achievements }) => {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h4 style={{ 
        color: '#f59e0b', 
        marginBottom: '1.5rem', 
        fontSize: '1.2rem', 
        fontWeight: 700 
      }}>
        Key Achievements
      </h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {achievements.map((achievement, achIndex) => (
          <li key={achIndex} style={{
            position: 'relative',
            paddingLeft: '2.5rem',
            marginBottom: '1rem',
            lineHeight: 1.7,
            fontSize: '1rem',
            color: 'rgba(248, 250, 252, 0.9)'
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#6366f1',
              fontSize: '1.1rem',
              top: '0.1rem'
            }}>▶</span>
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TechnologiesUsed = ({ technologies }) => {
  return (
    <div>
      <h5 style={{ 
        color: '#8b5cf6', 
        marginBottom: '1rem', 
        fontSize: '1rem', 
        textTransform: 'uppercase', 
        fontWeight: 700,
        letterSpacing: '1px'
      }}>
        Technologies Used
      </h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {technologies.map((tech, techIndex) => (
          <span key={techIndex} style={{
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#6366f1',
            padding: '0.6rem 1.2rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 500,
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
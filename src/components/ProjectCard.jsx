// components/ProjectCard.jsx - Detailed Explanation

import React from 'react';

/**
 * ProjectCard Component
 * 
 * PURPOSE: Displays individual project information in a visually appealing card format
 * 
 * PROPS:
 * - project: Object containing project data (from portfolioData.js)
 * - personalInfo: Object containing personal info (for links)
 * 
 * STRUCTURE:
 * 1. Main card container with glassmorphism effects
 * 2. Project header (title + category badge)
 * 3. Project description
 * 4. Impact/results section
 * 5. Technology tags
 * 6. Action links (demo + source code)
 */

const ProjectCard = ({ project, personalInfo }) => {
  return (
    <article className="project-card" style={{
      // Glassmorphism card design
      background: 'rgba(255, 255, 255, 0.05)',     // Semi-transparent white
      borderRadius: '24px',                         // Rounded corners
      padding: '2.5rem',                           // Internal spacing
      border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
      
      // Advanced animations and effects
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transitions
      position: 'relative',                        // For pseudo-elements
      overflow: 'hidden',                          // Hide rotating background
      backdropFilter: 'blur(10px)'                // Blur background behind card
    }}>
      
      {/* Content wrapper - positioned above animated background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* PROJECT HEADER */}
        <ProjectHeader project={project} />
        
        {/* PROJECT DESCRIPTION */}
        <ProjectDescription description={project.description} />
        
        {/* IMPACT SECTION */}
        <ImpactSection impact={project.impact} />
        
        {/* TECHNOLOGY TAGS */}
        <TechTags tags={project.tags} />
        
        {/* ACTION LINKS */}
        <ProjectLinks 
          github={project.github}
          website={personalInfo.website}
        />
        
      </div>
    </article>
  );
};

/**
 * ProjectHeader Component
 * Displays project title and category badge
 */
const ProjectHeader = ({ project }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: '1.5rem' 
    }}>
      {/* Project Title */}
      <h3 style={{ 
        color: '#f59e0b',        // Amber color
        fontSize: '1.6rem', 
        lineHeight: 1.3, 
        flex: 1,                 // Take available space
        fontWeight: 700 
      }}>
        {project.title}
      </h3>
      
      {/* Category Badge */}
      <span style={{ 
        background: 'rgba(99, 102, 241, 0.2)',  // Semi-transparent indigo
        color: '#6366f1',                       // Indigo text
        padding: '0.5rem 1rem', 
        borderRadius: '20px', 
        fontSize: '0.85rem',
        fontWeight: 600,
        marginLeft: '1rem',                     // Space from title
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        {project.category}
      </span>
    </div>
  );
};

/**
 * ProjectDescription Component
 * Shows detailed project description
 */
const ProjectDescription = ({ description }) => {
  return (
    <p style={{ 
      marginBottom: '2rem', 
      fontSize: '1.05rem', 
      lineHeight: 1.8,                    // Readable line spacing
      color: 'rgba(248, 250, 252, 0.9)'  // Slightly transparent white
    }}>
      {description}
    </p>
  );
};

/**
 * ImpactSection Component
 * Highlights project results and impact
 */
const ImpactSection = ({ impact }) => {
  return (
    <div style={{ 
      background: 'rgba(99, 102, 241, 0.15)',     // Highlighted background
      padding: '1rem', 
      borderRadius: '15px', 
      marginBottom: '2rem',
      border: '1px solid rgba(99, 102, 241, 0.3)' // Matching border
    }}>
      <div style={{ 
        fontSize: '0.9rem', 
        color: '#6366f1',                          // Indigo label
        fontWeight: 700, 
        marginBottom: '0.5rem' 
      }}>
        Impact & Results
      </div>
      <div style={{ 
        fontSize: '1rem', 
        color: 'rgba(255, 255, 255, 0.95)', 
        fontWeight: 500 
      }}>
        {impact}
      </div>
    </div>
  );
};

/**
 * TechTags Component
 * Displays technology stack used in project
 */
const TechTags = ({ tags }) => {
  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Section Label */}
      <div style={{ 
        fontSize: '0.9rem', 
        color: 'rgba(203, 213, 225, 0.8)', 
        marginBottom: '1rem', 
        textTransform: 'uppercase', 
        fontWeight: 700, 
        letterSpacing: '1px'
      }}>
        Technologies
      </div>
      
      {/* Technology Tags */}
      {tags.map((tag, tagIndex) => (
        <span key={tagIndex} style={{
          // Dynamic colors based on position
          background: `rgba(${
            tagIndex === 0 ? '139, 92, 246' :      // Purple for first
            tagIndex === 1 ? '99, 102, 241' :      // Indigo for second  
            '245, 158, 11'                          // Amber for rest
          }, 0.2)`,
          color: `${
            tagIndex === 0 ? '#8b5cf6' : 
            tagIndex === 1 ? '#6366f1' : 
            '#f59e0b'
          }`,
          padding: '0.6rem 1.2rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          marginRight: '0.75rem',
          marginBottom: '0.75rem',
          display: 'inline-block',
          fontWeight: 500,
          border: `1px solid rgba(${
            tagIndex === 0 ? '139, 92, 246' : 
            tagIndex === 1 ? '99, 102, 241' : 
            '245, 158, 11'
          }, 0.3)`
        }}>
          {tag}
        </span>
      ))}
    </div>
  );
};

/**
 * ProjectLinks Component
 * Action buttons for live demo and source code
 */
const ProjectLinks = ({ github, website }) => {
  const linkStyle = {
    textDecoration: 'none', 
    fontWeight: 600, 
    transition: 'all 0.4s ease',
    padding: '0.75rem 1.5rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
      {/* Live Demo Link */}
      <a 
        href={website} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          ...linkStyle,
          color: '#6366f1',                              // Indigo text
          background: 'rgba(99, 102, 241, 0.15)',       // Indigo background
          border: '1px solid rgba(99, 102, 241, 0.3)'   // Indigo border
        }}
      >
        <i className="fas fa-external-link-alt"></i> Live Demo
      </a>
      
      {/* Source Code Link */}
      <a 
        href={github} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          ...linkStyle,
          color: '#8b5cf6',                              // Purple text
          background: 'rgba(139, 92, 246, 0.15)',       // Purple background
          border: '1px solid rgba(139, 92, 246, 0.3)'   // Purple border
        }}
      >
        <i className="fab fa-github"></i> Source Code
      </a>
    </div>
  );
};

export default ProjectCard;

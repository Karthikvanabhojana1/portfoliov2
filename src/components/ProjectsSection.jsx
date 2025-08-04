// components/ProjectsSection.jsx
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = ({ projects, personalInfo }) => {
  return (
    <section id="projects" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="section-title">Featured Projects & Case Studies</h2>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.3rem', 
        marginBottom: '5rem', 
        color: 'rgba(203, 213, 225, 0.9)', 
        maxWidth: '800px', 
        margin: '0 auto 5rem', 
        lineHeight: 1.7 
      }}>
        Real-world applications built with modern technologies and best practices (multiple projects showcasing full-stack expertise)
      </p>
      <div className="projects-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
        gap: '3rem', 
        marginTop: '3rem' 
      }}>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            personalInfo={personalInfo} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
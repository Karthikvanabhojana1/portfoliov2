// components/AboutSection.jsx
import React from 'react';

const AboutSection = ({ personalInfo, experiences }) => {
  return (
    <section id="about" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="section-title">About Me - Your Next Software Developer</h2>
      <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <PersonalIntro personalInfo={personalInfo} />
        <ProfileSummary personalInfo={personalInfo} />
        <StatsGrid experiences={experiences} />
        <SkillsHighlight />
      </div>
    </section>
  );
};

const PersonalIntro = ({ personalInfo }) => {
  return (
    <p style={{ 
      fontSize: '1.5rem', 
      lineHeight: 1.8, 
      marginBottom: '3rem', 
      fontWeight: 400,
      color: 'rgba(248, 250, 252, 0.95)'
    }}>
      I'm <strong style={{ color: '#6366f1' }}>{personalInfo.name}</strong>, a dedicated 
      <strong style={{ color: '#8b5cf6' }}> Software Developer</strong> currently based in 
      <strong style={{ color: '#f59e0b' }}> {personalInfo.location}</strong> with 
      <strong style={{ color: '#10b981' }}> 3+ years of professional experience</strong> building 
      scalable backend systems and enterprise-grade applications.
    </p>
  );
};

const ProfileSummary = ({ personalInfo }) => {
  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.08)', 
      padding: '3rem', 
      borderRadius: '24px', 
      border: '1px solid rgba(255, 255, 255, 0.15)',
      marginBottom: '3rem',
      backdropFilter: 'blur(15px)'
    }}>
      <p style={{ 
        fontSize: '1.2rem', 
        lineHeight: 1.8, 
        color: 'rgba(248, 250, 252, 0.9)' 
      }}>
        {personalInfo.summary}
      </p>
    </div>
  );
};

const StatsGrid = ({ experiences }) => {
  const stats = [
    { value: '3+', label: 'Years Experience', color: '#8b5cf6' },
    { value: experiences.length, label: 'Companies', color: '#f59e0b' },
    { value: '8+', label: 'Projects', color: '#10b981' },
    { value: '100%', label: 'Success Rate', color: '#6366f1' }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '2rem', 
      marginBottom: '3rem' 
    }}>
      {stats.map((stat, index) => (
        <div key={index} style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          background: `rgba(${getColorRgb(stat.color)}, 0.1)`, 
          borderRadius: '20px', 
          border: `1px solid rgba(${getColorRgb(stat.color)}, 0.3)` 
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: stat.color }}>
            {stat.value}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const SkillsHighlight = () => {
  const skillCategories = [
    {
      title: 'Backend Expertise',
      color: '#6366f1',
      skills: 'Java, Spring Boot, Spring Cloud, Microservices Architecture, RESTful APIs, JWT Authentication'
    },
    {
      title: 'Cloud & DevOps',
      color: '#8b5cf6',
      skills: 'AWS, Google Cloud Platform, Docker, Kubernetes, Terraform, CI/CD Pipelines, Infrastructure Automation'
    },
    {
      title: 'Data & Analytics',
      color: '#f59e0b',
      skills: 'MongoDB, MySQL, PostgreSQL, Cassandra, Redis, Apache Kafka, Prometheus, Grafana'
    }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '2rem', 
      marginTop: '3rem' 
    }}>
      {skillCategories.map((category, index) => (
        <div key={index} style={{ 
          background: `rgba(${getColorRgb(category.color)}, 0.1)`, 
          padding: '2.5rem', 
          borderRadius: '20px', 
          border: `1px solid rgba(${getColorRgb(category.color)}, 0.3)`, 
          backdropFilter: 'blur(10px)' 
        }}>
          <h3 style={{ 
            color: category.color, 
            marginBottom: '1rem', 
            fontSize: '1.3rem' 
          }}>
            {category.title}
          </h3>
          <p style={{ lineHeight: 1.6 }}>
            {category.skills}
          </p>
        </div>
      ))}
    </div>
  );
};

// Helper function to get RGB values from hex colors
const getColorRgb = (hex) => {
  const colorMap = {
    '#6366f1': '99, 102, 241',
    '#8b5cf6': '139, 92, 246',
    '#f59e0b': '245, 158, 11',
    '#10b981': '16, 185, 129'
  };
  return colorMap[hex] || '99, 102, 241';
};

export default AboutSection;
// components/ContactMethods.jsx
import React from 'react';

const ContactMethods = ({ personalInfo }) => {
  const contactMethods = [
    {
      href: `mailto:${personalInfo.email}`,
      icon: 'fas fa-envelope',
      label: 'Email',
      value: personalInfo.email,
      color: '#6366f1',
      colorRgb: '99, 102, 241'
    },
    {
      href: `tel:${personalInfo.phone}`,
      icon: 'fas fa-phone',
      label: 'Phone',
      value: personalInfo.phone,
      color: '#8b5cf6',
      colorRgb: '139, 92, 246'
    },
    {
      href: personalInfo.linkedin,
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      value: 'Professional Profile',
      color: '#0077b5',
      colorRgb: '0, 119, 181',
      external: true
    },
    {
      href: personalInfo.github,
      icon: 'fab fa-github',
      label: 'GitHub',
      value: 'Source Code Portfolio',
      color: '#f59e0b',
      colorRgb: '245, 158, 11',
      external: true
    }
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h3 style={{ 
        color: '#f59e0b', 
        marginBottom: '3rem', 
        fontSize: '2rem', 
        fontWeight: 700 
      }}>
        Other Ways to Connect
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem', 
        maxWidth: '1000px', 
        margin: '0 auto' 
      }}>
        {contactMethods.map((method, index) => (
          <ContactMethodCard key={index} method={method} />
        ))}
      </div>
    </div>
  );
};

const ContactMethodCard = ({ method }) => {
  return (
    <a 
      href={method.href} 
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noopener noreferrer" : undefined}
      style={{ 
        color: method.color, 
        textDecoration: 'none', 
        fontSize: '1rem',
        padding: '2rem',
        background: `rgba(${method.colorRgb}, 0.1)`,
        borderRadius: '20px',
        border: `2px solid rgba(${method.colorRgb}, 0.2)`,
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        backdropFilter: 'blur(10px)',
        fontWeight: 500
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
        e.currentTarget.style.boxShadow = `0 15px 30px rgba(${method.colorRgb}, 0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ 
        background: `rgba(${method.colorRgb}, 0.2)`, 
        padding: '1rem', 
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '60px',
        height: '60px'
      }}>
        <i className={method.icon} style={{ fontSize: '1.5rem' }}></i>
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>
          {method.label}
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600 }}>
          {method.value}
        </div>
      </div>
    </a>
  );
};

export default ContactMethods;
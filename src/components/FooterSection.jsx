// components/FooterSection.jsx
import React from 'react';

const FooterSection = ({ personalInfo }) => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/drive/folders/17dn1Fy8qNmHk2Nup-9j9ZBqyel_FI9gS?usp=sharing';
    link.download = 'Karthik_Vanabhojana_Resume.pdf';
    link.click();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="reveal"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        borderTop: '2px solid rgba(99, 102, 241, 0.2)',
        padding: '4rem 2rem 2rem',
        marginTop: '4rem'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* About Section */}
          <div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              {personalInfo.name}
            </div>
            <p style={{
              color: 'rgba(203, 213, 225, 0.9)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              {personalInfo.title}
            </p>
            <p style={{
              color: 'rgba(203, 213, 225, 0.8)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Software Developer with 3+ years of experience building scalable backend systems. 
              Currently pursuing MS in Information Systems at Northeastern University.
            </p>
            
            {/* Resume Download Button */}
            <button 
              onClick={downloadResume}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              <i className="fas fa-file-pdf"></i>
              Download Resume
            </button>
          </div>

          {/* Contact Information */}
          <div>
            <h3 style={{
              color: '#f59e0b',
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              Contact Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                style={{
                  color: 'rgba(203, 213, 225, 0.9)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 0'
                }}
                onMouseEnter={(e) => e.target.style.color = '#6366f1'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.9)'}
              >
                <i className="fas fa-envelope" style={{ fontSize: '1.1rem', color: '#6366f1' }}></i>
                {personalInfo.email}
              </a>

              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone}`}
                style={{
                  color: 'rgba(203, 213, 225, 0.9)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 0'
                }}
                onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.9)'}
              >
                <i className="fas fa-phone" style={{ fontSize: '1.1rem', color: '#8b5cf6' }}></i>
                {personalInfo.phone}
              </a>

              {/* Location */}
              <div style={{
                color: 'rgba(203, 213, 225, 0.9)',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0'
              }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: '1.1rem', color: '#10b981' }}></i>
                {personalInfo.location}
              </div>

              {/* Website */}
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(203, 213, 225, 0.9)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 0'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f59e0b'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.9)'}
              >
                <i className="fas fa-globe" style={{ fontSize: '1.1rem', color: '#f59e0b' }}></i>
                karthikvanabhojana.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Links Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            color: '#6366f1',
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Connect With Me
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            
            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(0, 119, 181, 0.1)',
                border: '2px solid rgba(0, 119, 181, 0.3)',
                borderRadius: '15px',
                color: '#0077b5',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 119, 181, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 119, 181, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fab fa-linkedin" style={{ fontSize: '1.3rem' }}></i>
              LinkedIn Profile
            </a>

            {/* GitHub */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '15px',
                color: '#f59e0b',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(245, 158, 11, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(245, 158, 11, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fab fa-github" style={{ fontSize: '1.3rem' }}></i>
              GitHub Portfolio
            </a>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '15px',
                color: '#6366f1',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(99, 102, 241, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-envelope" style={{ fontSize: '1.3rem' }}></i>
              Send Email
            </a>

            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '15px',
                color: '#8b5cf6',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(139, 92, 246, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-phone" style={{ fontSize: '1.3rem' }}></i>
              Call Me
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          
          {/* Copyright */}
          <div style={{
            color: 'rgba(203, 213, 225, 0.7)',
            fontSize: '0.9rem'
          }}>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          {/* Social Icons */}
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(0, 119, 181, 0.2)',
                border: '2px solid rgba(0, 119, 181, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0077b5',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0077b5';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 119, 181, 0.2)';
                e.target.style.color = '#0077b5';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f59e0b';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(245, 158, 11, 0.2)';
                e.target.style.color = '#f59e0b';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(99, 102, 241, 0.2)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366f1',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#6366f1';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(99, 102, 241, 0.2)';
                e.target.style.color = '#6366f1';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-envelope"></i>
            </a>

            <a
              href={`tel:${personalInfo.phone}`}
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5cf6',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#8b5cf6';
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                e.target.style.color = '#8b5cf6';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
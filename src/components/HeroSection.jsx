const HeroSection = ({ personalInfo, navigateToSection }) => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/drive/folders/17dn1Fy8qNmHk2Nup-9j9ZBqyel_FI9gS?usp=sharing';
    link.download = 'Karthik_Vanabhojana_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ zIndex: 2, animation: 'fadeInUp 1s ease-out', maxWidth: '1200px', padding: '0 2rem' }}>
        
        {/* PROFILE PICTURE */}
        <div style={{
          marginBottom: '0rem',
          animation: 'fadeInUp 1s ease-out 0.2s both'
        }}>

          <img 
            src="/PHOTO-2025-05-09-07-45-10.jpg" // Place your image in public/images/
            alt={`${personalInfo.name} - Profile Picture`}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
          />
        </div>

        <h1>{personalInfo.name}</h1>
        <p className="subtitle">{personalInfo.title}</p>
        <div style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(203, 213, 225, 0.9)', 
          marginBottom: '3rem', 
          opacity: 0, 
          animation: 'fadeInUp 1s ease-out 0.8s both',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}>
          MS Student at Northeastern University | {personalInfo.location}
        </div>
        <div className="cta-buttons" style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button onClick={() => navigateToSection('projects')} className="btn btn-primary">
            <span>Explore Projects</span>
          </button>
          
          <button onClick={downloadResume} className="btn btn-accent" style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: '1.25rem 2.5rem',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
          }}>
            <i className="fas fa-download"></i>
            <span>Download Resume</span>
          </button>
          
          <button onClick={() => navigateToSection('contact-legacy')} className="btn btn-secondary">
            <span>Get In Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

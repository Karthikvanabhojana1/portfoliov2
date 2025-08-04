const FooterCard = ({ href, bgColor, iconClass, title, subtitle }) => (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem 2rem',
        borderRadius: '20px',
        textDecoration: 'none',
        background: `rgba(${bgColor}, 0.1)`,
        border: `2px solid rgba(${bgColor}, 0.2)`,
        color: `rgb(${bgColor})`,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        flex: '1 1 280px',
        minWidth: '260px'
      }}
      onMouseEnter={e => e.currentTarget.style.background = `rgba(${bgColor}, 0.2)`}
      onMouseLeave={e => e.currentTarget.style.background = `rgba(${bgColor}, 0.1)`}
    >
      <div style={{
        background: `rgba(${bgColor}, 0.2)`,
        padding: '1rem',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '60px',
        height: '60px'
      }}>
        <i className={iconClass} style={{ fontSize: '1.5rem' }}></i>
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{title}</div>
        <div style={{ fontSize: '1rem', fontWeight: 600 }}>{subtitle}</div>
      </div>
    </a>
  );
  export default FooterCard;
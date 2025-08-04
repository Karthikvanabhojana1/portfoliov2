// components/GlobalStyles.jsx
import React from 'react';

const GlobalStyles = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary: #6366f1;
          --secondary: #8b5cf6;
          --accent: #f59e0b;
          --success: #10b981;
          --warning: #f59e0b;
          --error: #ef4444;
          --dark: #0f172a;
          --light: #f8fafc;
          --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
          --shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--dark);
          color: var(--light);
          line-height: 1.6;
        }

        /* Enhanced floating background */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
          z-index: -1;
          animation: bgShift 20s ease-in-out infinite;
        }

        @keyframes bgShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Enhanced animations */
        @keyframes glow {
          from { filter: drop-shadow(0 0 10px var(--primary)); }
          to { filter: drop-shadow(0 0 25px var(--secondary)); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
          60% { transform: translateY(-6px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }

        /* Component styles */
        .logo {
          font-size: 2rem;
          font-weight: 900;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
          cursor: pointer;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.5));
        }

        .logo:hover {
          transform: scale(1.15) rotate(5deg);
        }

        .nav-button {
          background: none;
          border: none;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          position: relative;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
        }

        .nav-button.active {
          color: #ffffff;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .nav-button:hover {
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }

        .hero h1 {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideInLeft 1s ease-out 0.2s both;
          position: relative;
          line-height: 1.1;
        }

        .hero h1::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 0;
          width: 100%;
          height: 6px;
          background: var(--gradient);
          border-radius: 3px;
          animation: typewriter 2s ease-out 1s both;
        }

        .hero .subtitle {
          font-size: clamp(1.3rem, 3vw, 2.2rem);
          margin-bottom: 2rem;
          opacity: 0;
          animation: slideInRight 1s ease-out 0.4s both;
          background: linear-gradient(45deg, #f8fafc, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 500;
          line-height: 1.3;
        }

        .cta-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .btn {
          padding: 1.25rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
        }

        .btn-primary {
          background: var(--gradient);
          color: white;
          box-shadow: var(--shadow);
        }

        .btn-secondary {
          background: transparent;
          color: var(--light);
          border: 2px solid var(--primary);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
        }

        .btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
        }

        .btn:active {
          transform: translateY(-2px) scale(1.02);
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          text-align: center;
          margin-bottom: 3rem;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          font-weight: 900;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 60px;
          height: 3px;
          background: var(--gradient);
          border-radius: 2px;
          transform: translateX(-50%);
        }

        /* Enhanced cards */
        .tech-item {
          text-align: center;
          padding: 2.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.8s ease-out;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .tech-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .tech-item:hover::before {
          transform: scaleX(1);
        }

        .tech-item:hover {
          transform: translateY(-12px) scale(1.05);
          background: rgba(99, 102, 241, 0.1);
          box-shadow: 0 25px 50px rgba(99, 102, 241, 0.25);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .tech-item i {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: var(--accent);
          animation: bounce 3s infinite;
          transition: all 0.3s ease;
        }

        .tech-item:hover i {
          color: var(--primary);
          transform: scale(1.1);
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, var(--primary), transparent);
          animation: rotate 6s linear infinite;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .project-card:hover::before {
          opacity: 0.1;
        }

        .project-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(99, 102, 241, 0.3);
          border-color: rgba(99, 102, 241, 0.3);
        }

        /* Experience timeline */
        .experience-timeline {
          position: relative;
          padding: 3rem 0;
        }

        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--gradient);
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .experience-item {
          display: flex;
          margin-bottom: 5rem;
          position: relative;
        }

        .experience-item:nth-child(odd) {
          flex-direction: row;
        }

        .experience-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .experience-content {
          flex: 1;
          max-width: 45%;
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .experience-content:hover {
          background: rgba(99, 102, 241, 0.1);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.25);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .experience-item:nth-child(odd) .experience-content {
          margin-right: 3rem;
        }

        .experience-item:nth-child(even) .experience-content {
          margin-left: 3rem;
        }

        .experience-dot {
          position: absolute;
          left: 50%;
          top: 3rem;
          width: 24px;
          height: 24px;
          background: var(--accent);
          border-radius: 50%;
          transform: translateX(-50%);
          border: 4px solid var(--dark);
          z-index: 1;
          animation: pulse 3s infinite;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        }

        .experience-date-badge {
          position: absolute;
          left: 50%;
          top: 0.5rem;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 700;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
          border: 3px solid var(--dark);
          z-index: 2;
          white-space: nowrap;
          backdrop-filter: blur(10px);
          min-width: 180px;
          text-align: center;
        }

        .chatbot-toggle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--gradient);
          border: none;
          color: white;
          font-size: 1.6rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
          animation: pulse 2s infinite;
          position: relative;
        }

        .chatbot-toggle::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: var(--gradient);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          animation: spin 3s linear infinite;
        }

        .chatbot-toggle:hover::before {
          opacity: 0.3;
        }

        .chatbot-toggle:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.6);
        }

        .reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .search-box {
            width: 140px;
          }
          
          .search-box:focus {
            width: 180px;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          .chatbot-window {
            width: calc(100vw - 3rem);
            right: 1.5rem;
            height: 70vh;
          }

          .experience-timeline::before {
            left: 2rem;
          }

          .experience-item {
            flex-direction: column !important;
            margin-left: 2rem;
            margin-bottom: 3rem;
          }

          .experience-content {
            max-width: 100%;
            margin: 0 !important;
          }

          .experience-dot {
            left: 2rem;
          }

          .experience-date-badge {
            left: 2rem;
            transform: none;
            min-width: auto;
            width: max-content;
          }
        }

        /* Accessibility */
        .btn:focus,
        .nav-button:focus,
        input:focus,
        textarea:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--gradient);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, var(--secondary), var(--primary));
        }
      `}</style>
      
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </>
  );
};

export default GlobalStyles;
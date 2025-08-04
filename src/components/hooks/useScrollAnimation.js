// hooks/useScrollAnimation.js
import { useEffect } from 'react';

export const useScrollAnimation = (setActiveSection) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Update active section
          const sectionId = entry.target.id;
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => observer.observe(element));

    return () => {
      reveals.forEach(element => observer.unobserve(element));
    };
  }, [setActiveSection]);
};

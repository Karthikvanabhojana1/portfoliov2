import { useCallback } from 'react';

export const useNavigation = (setActiveSection) => {
  const navigateToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [setActiveSection]);

  return { navigateToSection };
};
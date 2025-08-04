// Portfolio.jsx - Complete Main Component
import React, { useState, useEffect } from 'react';

// Components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Chatbot from './components/Chatbot/Chatbot';
import GlobalStyles from './components/GlobalStyles';

// Data and Configuration
import { personalInfo, projects, experiences, techStack } from './components/data/portfolioData';

// Custom Hooks
import { useSearch } from './components/hooks/useSearch';
import { useNavigation } from './components/hooks/useNavigation';
import { useChatbot } from './components/hooks/useChatbot';
import { useScrollAnimation } from './components/hooks/useScrollAnimation';

const Portfolio = () => {
  // Main state
  const [activeSection, setActiveSection] = useState('home');
  
  // Custom hooks
  const { 
    searchQuery, 
    searchResults, 
    showSearchResults, 
    handleSearch,
    setShowSearchResults 
  } = useSearch();
  
  const { navigateToSection } = useNavigation(setActiveSection);
  
  const { 
    chatbotOpen, 
    setChatbotOpen, 
    chatMessages, 
    setChatMessages,
    isLoading: chatLoading,
    isTyping,
    error: chatError,
    sendMessage 
  } = useChatbot();

  // Initialize scroll animations
  useScrollAnimation(setActiveSection);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setShowSearchResults]);

  return (
    <>
      <GlobalStyles />
      <div style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: '#f8fafc',
        overflowX: 'hidden',
        minHeight: '100vh'
      }}>
        <Navigation 
          activeSection={activeSection}
          navigateToSection={navigateToSection}
          searchQuery={searchQuery}
          searchResults={searchResults}
          showSearchResults={showSearchResults}
          handleSearch={handleSearch}
        />
        
        <HeroSection 
          personalInfo={personalInfo}
          navigateToSection={navigateToSection}
        />
        
        <AboutSection 
          personalInfo={personalInfo}
          experiences={experiences}
        />
        
        <ExperienceSection 
          experiences={experiences}
        />
        
        <TechStackSection 
          techStack={techStack}
        />
        
        <ProjectsSection 
          projects={projects}
          personalInfo={personalInfo}
        />
        
        <ContactSection 
          personalInfo={personalInfo}
        />
        
        <Chatbot 
          chatbotOpen={chatbotOpen}
          setChatbotOpen={setChatbotOpen}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          sendMessage={sendMessage}
          personalInfo={personalInfo}
          isLoading={chatLoading}
          isTyping={isTyping}
          error={chatError}
          navigateToSection={navigateToSection}
        />
      </div>
    </>
  );
};

export default Portfolio;
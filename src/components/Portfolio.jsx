// Portfolio.jsx - FIXED IMPORT PATHS
import React, { useState, useEffect } from 'react';

// Components
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import TechStackSection from './TechStackSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Chatbot from './Chatbot/Chatbot';
import GlobalStyles from './GlobalStyles';
import FooterSection from './FooterSection';

// Data and Configuration - FIXED: Removed components/ prefix
import { personalInfo, projects, experiences, techStack } from './data/portfolioData';

// Custom Hooks - FIXED: Removed components/ prefix
import { useSearch } from './hooks/useSearch';
import { useNavigation } from './hooks/useNavigation';
import { useChatbot } from './hooks/useChatbot';
import { useScrollAnimation } from './hooks/useScrollAnimation';

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

  // DEBUG: Check if ContactSection is rendered
  useEffect(() => {
    console.log('PersonalInfo loaded:', personalInfo);
    
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      console.log('Contact section check:', contactSection ? '✅ FOUND' : '❌ NOT FOUND');
      
      if (!contactSection) {
        console.log('🚨 CONTACT SECTION NOT FOUND!');
        const allSections = document.querySelectorAll('section[id]');
        console.log('Available sections:', Array.from(allSections).map(s => s.id));
      }
    }, 2000);
  }, []);

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
        
        {/* CONTACT SECTION - Make sure this is here */}
        <ContactSection 
          personalInfo={personalInfo}
        />
        
        <FooterSection 
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
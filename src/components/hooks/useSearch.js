import { useState, useCallback, useRef, useMemo } from 'react';
import { personalInfo, projects, experiences, techStack } from '../data/portfolioData';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef(null);

  const searchData = useMemo(() => [
    ...projects.map(project => ({
      title: project.title,
      description: project.description,
      category: 'Projects',
      section: 'projects',
      tags: project.tags
    })),
    ...techStack.map(tech => ({
      title: tech.title,
      description: tech.description,
      category: 'Skills',
      section: 'tech',
      level: tech.level
    })),
    ...experiences.map(exp => ({
      title: `${exp.role} at ${exp.company}`,
      description: exp.description,
      category: 'Experience',
      section: 'experience',
      location: exp.location
    })),
    {
      title: 'Hire Software Developer',
      description: 'Available for software development roles, internships, and full-time opportunities.',
      category: 'Contact',
      section: 'contact'
    }
  ], []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      const filteredResults = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      );

      setSearchResults(filteredResults);
      setShowSearchResults(true);
    }, 300);
  }, [searchData]);

  return {
    searchQuery,
    searchResults,
    showSearchResults,
    handleSearch,
    setShowSearchResults
  };
};
import React, { useMemo } from 'react';
import Header from './Header';
import Projects from './Projects';
import Calendar from './Calendar';
import ContactForm from './ContactForm';

const Portfolio = () => {
  const personalInfo = useMemo(() => ({
    name: 'Karthik Vanabhojana',
    title: 'Software Developer',
  }), []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'SecureChat',
      description: 'Messaging application with end-to-end encryption.',
      github: 'https://github.com/Karthikvanabhojana1/securechat',
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'Full-stack weather application built with React and Node.',
      github: 'https://github.com/Karthikvanabhojana1/weather-app',
    },
  ], []);

  return (
    <div className="container mx-auto px-4">
      <Header info={personalInfo} />
      <Projects projects={projects} />
      <Calendar />
      <ContactForm />
    </div>
  );
};

export default Portfolio;

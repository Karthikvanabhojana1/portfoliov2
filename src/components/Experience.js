import React from 'react';

const experiences = [
  {
    id: 1,
    company: 'Mimosa Networks',
    role: 'Software Development Intern',
    duration: 'May 2024 - Jul 2025',
    location: 'Frisco, USA',
    description:
      'Engineered scalable microservices for telecom-grade Network Management System using Java, Spring Boot, and MongoDB, enabling real-time monitoring of wireless devices across enterprise networks.',
    achievements: [
      'Shipped production services through multiple releases with secure, multi-tenant RESTful APIs and JWT-based authentication',
      'Automated deployment pipelines using Docker, Kubernetes, and CI/CD workflows, boosting release velocity by 30%',
      'Improved service uptime with enterprise-grade performance monitoring',
      'Built real-time monitoring system for wireless devices across enterprise networks'
    ],
    technologies: ['Java', 'Spring Boot', 'MongoDB', 'Docker', 'Kubernetes'],
    metrics: { improvement: '30%', uptime: '99.9%', devices: '10K+' }
  },
  {
    id: 2,
    company: 'Accenture',
    role: 'Custom Software Engineering Analyst',
    duration: 'Jan 2021 - Jun 2023',
    location: 'Bengaluru, India',
    description:
      'Designed and orchestrated distributed microservices using Java, Spring Boot, and Kubernetes, enhancing system scalability and resilience for enterprise-scale applications.',
    achievements: [
      'Optimized service communication by integrating Apache Kafka, increasing message throughput by 45%',
      'Reduced system latency by 20% across distributed systems through performance optimization',
      'Implemented comprehensive observability solutions using Prometheus, Grafana, and ELK stack',
      'Ensured real-time monitoring, compliance, and operational excellence for enterprise applications'
    ],
    technologies: ['Java', 'Spring Boot', 'Kubernetes', 'Apache Kafka', 'ELK Stack'],
    metrics: { throughput: '45%', latency: '-20%', systems: '50+' }
  }
];

const Experience = () => (
  <section id="experience" className="py-32 px-8 max-w-screen-xl mx-auto">
    <h2 className="text-3xl font-bold mb-8">Experience</h2>
    <div className="space-y-8">
      {experiences.map(exp => (
        <div key={exp.id} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">
            {exp.role} at {exp.company}
          </h3>
          <p className="text-sm text-gray-500">
            {exp.duration} • {exp.location}
          </p>
          <p className="mt-2">{exp.description}</p>
          <ul className="list-disc list-inside mt-2">
            {exp.achievements.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-2 text-sm text-gray-600">
            Technologies: {exp.technologies.join(', ')}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;

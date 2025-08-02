import React from 'react';

const techStack = [
  {
    icon: 'fab fa-java',
    title: 'Java',
    description:
      'Enterprise-grade Java development with Spring Boot, Spring MVC, and microservices architecture',
    level: 'Expert',
    years: '3+'
  },
  {
    icon: 'fas fa-leaf',
    title: 'Spring Boot',
    description:
      'Building scalable backend systems, RESTful APIs, and microservices with Spring ecosystem',
    level: 'Expert',
    years: '3+'
  },
  {
    icon: 'fab fa-python',
    title: 'Python',
    description:
      'Data analysis, machine learning, automation scripts, and generative AI development',
    level: 'Advanced',
    years: '2+'
  },
  {
    icon: 'fab fa-js-square',
    title: 'JavaScript',
    description:
      'Modern JavaScript, Node.js, TypeScript, and full-stack web development',
    level: 'Advanced',
    years: '2+'
  },
  {
    icon: 'fas fa-database',
    title: 'Databases',
    description:
      'MongoDB, MySQL, PostgreSQL, Cassandra, Redis for robust data management',
    level: 'Advanced',
    years: '3+'
  },
  {
    icon: 'fab fa-aws',
    title: 'Cloud Platforms',
    description:
      'AWS, Google Cloud Platform, EC2, Compute Engine, serverless architecture',
    level: 'Intermediate',
    years: '2+'
  },
  {
    icon: 'fab fa-docker',
    title: 'DevOps & Containers',
    description:
      'Docker, Kubernetes, CI/CD pipelines, Terraform, and infrastructure automation',
    level: 'Advanced',
    years: '2+'
  },
  {
    icon: 'fab fa-git-alt',
    title: 'Development Tools',
    description:
      'Git, Maven, IntelliJ IDEA, Visual Studio Code, and agile development practices',
    level: 'Expert',
    years: '3+'
  }
];

const TechStack = () => (
  <section id="tech" className="py-32 px-8 max-w-screen-xl mx-auto">
    <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {techStack.map(tech => (
        <div key={tech.title} className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">
            <i className={tech.icon}></i>
          </div>
          <h3 className="text-xl font-semibold">{tech.title}</h3>
          <p className="text-sm text-gray-600">{tech.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            {tech.level} • {tech.years} years
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default TechStack;

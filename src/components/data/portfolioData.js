// data/portfolioData.js - Complete data from original file
export const personalInfo = {
    name: "Karthik Vanabhojana",
    title: "Software Developer | Java, Spring Boot & Cloud Architecture Specialist",
    location: "USA",
    email: "karthikvanabhojana@gmail.com",
    phone: "+1 617-935-7502",
    website: "https://karthikvanabhojana.com",
    github: "https://github.com/Karthikvanabhojana1",
    linkedin: "https://linkedin.com/in/karthik-vanabhojana",
    summary: "Software Developer with 3+ years of experience building scalable backend systems using Java, Spring Boot, and MySQL in Agile environments. Skilled in microservices architecture, cloud-native services, and DevOps tooling (Docker, Kubernetes, Terraform). Proficient in Python, JavaScript, and modern frontend frameworks. Currently pursuing MS in Information Systems at Northeastern University."  };
  
  export const projects = [
    {
      id: 1,
      title: 'SecureChat',
      description: 'Comprehensive messaging application with end-to-end encryption, real-time messaging, group chats, file sharing, voice/video calls, and modern UI. Built with Node.js, Socket.IO, and SQLite featuring AES-256 encryption.',
      tags: ['Node.js', 'Socket.IO', 'SQLite'],
      category: 'Full-Stack',
      impact: '1000+ users',
      github: 'https://github.com/Karthikvanabhojana1/messagingapp.git'
    },
    {
      id: 2,
      title: 'Soros-Style Trading Chatbot & Dashboard',
      description: 'AI chatbot that speaks like George Soros with PDF processing capabilities, comprehensive knowledge base, and modern React frontend. Features FastAPI backend and OpenAI integration for financial analysis.',
      tags: ['Python', 'FastAPI', 'React'],
      category: 'AI/ML',
      impact: 'Production AI system',
      github: 'https://github.com/Karthikvanabhojana1/stockpredictionmodel.git'
    },
    {
      id: 3,
      title: 'Blog Application API',
      description: 'Spring Boot RESTful API for blog application with user registration, JWT authentication, CRUD operations for posts and categories, comment management, image uploads, and role-based access control.',
      tags: ['Spring Boot', 'MySQL', 'JWT'],
      category: 'Backend',
      impact: 'Enterprise-grade API',
      github: 'https://github.com/Karthikvanabhojana1/blog-application.git'
    },
    {
      id: 4,
      title: 'Weather App with Redis Caching',
      description: 'Modern full-stack weather application with React frontend, Node.js backend, and Redis caching. Features real-time weather data, 5-day forecasts, Docker containerization, and responsive design.',
      tags: ['React', 'Node.js', 'Redis'],
      category: 'Full-Stack',
      impact: '99.9% uptime',
      github: 'https://github.com/Karthikvanabhojana1/weatherapp.git'
    },
    {
      id: 5,
      title: 'React Material UI Dashboard',
      description: 'Interactive dashboard application built with React.js and Material UI for data visualization and management. Features responsive layout, Chart.js integration, and customization support.',
      tags: ['React', 'Material-UI', 'Chart.js'],
      category: 'Frontend',
      impact: 'Data visualization platform',
      github: 'https://github.com/Karthikvanabhojana1/dashboard.git'
    },
    {
      id: 6,
      title: 'ChatGPT Wrapper Application',
      description: 'Modern React application providing beautiful interface for OpenAI\'s ChatGPT API. Features real-time chat, conversation history, dashboard analytics, and mobile-responsive design.',
      tags: ['React', 'OpenAI API', 'Tailwind'],
      category: 'AI/ML',
      impact: 'AI integration showcase',
      github: 'https://github.com/Karthikvanabhojana1/chatbot.git'
    },
    {
      id: 7,
      title: 'Cloud-Native API Development & Infrastructure Automation',
      description: 'Enterprise-grade CI/CD pipeline on Google Cloud Platform with load balancing, auto-scaling, and Terraform automation following IaaC principles.',
      tags: ['GCP', 'Terraform', 'Cloud Functions'],
      category: 'DevOps',
      impact: '30% faster deployments',
      github: 'https://github.com/Karthik-vanabhojana/webapp.git'
    },
    {
      id: 8,
      title: 'Internet Banking System',
      description: 'Modular microservices built with Spring Boot, Spring Cloud, and Netflix Eureka for service discovery, enabling dynamic scaling and loose coupling between banking modules.',
      tags: ['Spring Boot', 'PostgreSQL', 'Microservices'],
      category: 'Backend',
      impact: 'Scalable banking platform',
      github: 'https://github.com/Karthikvanabhojana1/bankingapplication.git'
    }
  ];
  
  export const experiences = [
    {
      id: 1,
      company: 'Mimosa Networks',
      role: 'Software Development Intern',
      duration: 'May 2024 - Jul 2025',
      location: 'Frisco, USA',
      description: 'Engineered scalable microservices for telecom-grade Network Management System using Java, Spring Boot, and MongoDB, enabling real-time monitoring of wireless devices across enterprise networks.',
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
      description: 'Designed and orchestrated distributed microservices using Java, Spring Boot, and Kubernetes, enhancing system scalability and resilience for enterprise-scale applications.',
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
  
  export const techStack = [
    { 
      icon: 'fab fa-java', 
      title: 'Java', 
      description: 'Enterprise-grade Java development with Spring Boot, Spring MVC, and microservices architecture',
      level: 'Expert',
      years: '3+'
    },
    { 
      icon: 'fas fa-leaf', 
      title: 'Spring Boot', 
      description: 'Building scalable backend systems, RESTful APIs, and microservices with Spring ecosystem',
      level: 'Expert',
      years: '3+'
    },
    { 
      icon: 'fab fa-python', 
      title: 'Python', 
      description: 'Data analysis, machine learning, automation scripts, and generative AI development',
      level: 'Advanced',
      years: '2+'
    },
    { 
      icon: 'fab fa-js-square', 
      title: 'JavaScript', 
      description: 'Modern JavaScript, Node.js, TypeScript, and full-stack web development',
      level: 'Advanced',
      years: '2+'
    },
    { 
      icon: 'fas fa-database', 
      title: 'Databases', 
      description: 'MongoDB, MySQL, PostgreSQL, Cassandra, Redis for robust data management',
      level: 'Advanced',
      years: '3+'
    },
    { 
      icon: 'fab fa-aws', 
      title: 'Cloud Platforms', 
      description: 'AWS, Google Cloud Platform, EC2, Compute Engine, serverless architecture',
      level: 'Intermediate',
      years: '2+'
    },
    { 
      icon: 'fab fa-docker', 
      title: 'DevOps & Containers', 
      description: 'Docker, Kubernetes, CI/CD pipelines, Terraform, and infrastructure automation',
      level: 'Advanced',
      years: '2+'
    },
    { 
      icon: 'fab fa-git-alt', 
      title: 'Development Tools', 
      description: 'Git, Maven, IntelliJ IDEA, Visual Studio Code, and agile development practices',
      level: 'Expert',
      years: '3+'
    }
  ];
  

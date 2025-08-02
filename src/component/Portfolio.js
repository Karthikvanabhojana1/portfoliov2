import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const Portfolio = () => {
  // Browser-safe configuration
  const CONFIG = {
    // OpenAI API Configuration
    openai: {
      apiKey: process.env?.REACT_APP_OPENAI_API_KEY
    },
    // EmailJS Configuration  
    emailjs: {
      serviceId:  process.env?.REACT_APP_EMAILJS_SERVICE_ID,
      templateId: process.env?.REACT_APP_EMAILJS_TEMPLATE_ID,
      publicKey: process.env?.REACT_APP_EMAILJS_PUBLIC_KEY
    }
  };

  const OPENAI_API_KEY = CONFIG.openai.apiKey;

  // State management with performance optimizations
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showScheduling, setShowScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('consultation');

  // Refs for performance
  const chatMessagesRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Memoized data structures for better performance
  const personalInfo = useMemo(() => ({
    name: "Karthik Vanabhojana",
    title: "Software Developer | Java, Spring Boot & Cloud Architecture Specialist",
    location: "San Jose, CA",
    email: "karthikvanabhojana@gmail.com",
    phone: "+1 617-935-7502",
    website: "https://karthikvanabhojana.com",
    github: "https://github.com/Karthikvanabhojana1",
    linkedin: "https://linkedin.com/in/karthik-vanabhojana",
    summary: "Software Developer with 3+ years of experience building scalable backend systems using Java, Spring Boot, and MySQL in Agile environments. Proven expertise in microservices architecture, cloud-native services, and enterprise-grade applications. Currently pursuing MS in Information Systems at Northeastern University."
  }), []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'SecureChat',
      description: 'Comprehensive messaging application with end-to-end encryption, real-time messaging, group chats, file sharing, voice/video calls, and modern UI. Built with Node.js, Socket.IO, and SQLite featuring AES-256 encryption.',
      tags: ['Node.js', 'Socket.IO', 'SQLite'],
      category: 'Full-Stack',
      impact: '1000+ users',
      github: 'https://github.com/Karthikvanabhojana1/securechat'
    },
    {
      id: 2,
      title: 'Soros-Style Trading Chatbot & Dashboard',
      description: 'AI chatbot that speaks like George Soros with PDF processing capabilities, comprehensive knowledge base, and modern React frontend. Features FastAPI backend and OpenAI integration for financial analysis.',
      tags: ['Python', 'FastAPI', 'React'],
      category: 'AI/ML',
      impact: 'Production AI system',
      github: 'https://github.com/Karthikvanabhojana1/soros-chatbot'
    },
    {
      id: 3,
      title: 'Blog Application API',
      description: 'Spring Boot RESTful API for blog application with user registration, JWT authentication, CRUD operations for posts and categories, comment management, image uploads, and role-based access control.',
      tags: ['Spring Boot', 'MySQL', 'JWT'],
      category: 'Backend',
      impact: 'Enterprise-grade API',
      github: 'https://github.com/Karthikvanabhojana1/blog-api'
    },
    {
      id: 4,
      title: 'Weather App with Redis Caching',
      description: 'Modern full-stack weather application with React frontend, Node.js backend, and Redis caching. Features real-time weather data, 5-day forecasts, Docker containerization, and responsive design.',
      tags: ['React', 'Node.js', 'Redis'],
      category: 'Full-Stack',
      impact: '99.9% uptime',
      github: 'https://github.com/Karthikvanabhojana1/weather-app'
    },
    {
      id: 5,
      title: 'React Material UI Dashboard',
      description: 'Interactive dashboard application built with React.js and Material UI for data visualization and management. Features responsive layout, Chart.js integration, and customization support.',
      tags: ['React', 'Material-UI', 'Chart.js'],
      category: 'Frontend',
      impact: 'Data visualization platform',
      github: 'https://github.com/Karthikvanabhojana1/dashboard'
    },
    {
      id: 6,
      title: 'ChatGPT Wrapper Application',
      description: 'Modern React application providing beautiful interface for OpenAI\'s ChatGPT API. Features real-time chat, conversation history, dashboard analytics, and mobile-responsive design.',
      tags: ['React', 'OpenAI API', 'Tailwind'],
      category: 'AI/ML',
      impact: 'AI integration showcase',
      github: 'https://github.com/Karthikvanabhojana1/chatgpt-wrapper'
    },
    {
      id: 7,
      title: 'Cloud-Native API Development & Infrastructure Automation',
      description: 'Enterprise-grade CI/CD pipeline on Google Cloud Platform with load balancing, auto-scaling, and Terraform automation following IaaC principles.',
      tags: ['GCP', 'Terraform', 'Cloud Functions'],
      category: 'DevOps',
      impact: '30% faster deployments',
      github: 'https://github.com/Karthikvanabhojana1/cloud-infrastructure'
    },
    {
      id: 8,
      title: 'Internet Banking System',
      description: 'Modular microservices built with Spring Boot, Spring Cloud, and Netflix Eureka for service discovery, enabling dynamic scaling and loose coupling between banking modules.',
      tags: ['Spring Boot', 'PostgreSQL', 'Microservices'],
      category: 'Backend',
      impact: 'Scalable banking platform',
      github: 'https://github.com/Karthikvanabhojana1/banking-system'
    }
  ], []);

  const experiences = useMemo(() => [
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
  ], []);

  const techStack = useMemo(() => [
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
  ], []);

  // Generate dynamic search data
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
  ], [projects, techStack, experiences]);

  // Enhanced AI context generation
  const generateAIContext = useCallback(() => {
    return `
You are an AI assistant representing ${personalInfo.name}, a highly skilled ${personalInfo.title}.

PERSONAL INFO:
- Name: ${personalInfo.name}
- Location: ${personalInfo.location}
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Website: ${personalInfo.website}
- GitHub: ${personalInfo.github}
- LinkedIn: ${personalInfo.linkedin}

PROFESSIONAL SUMMARY:
${personalInfo.summary}

CURRENT STATUS:
- Actively seeking software development opportunities
- Available for full-time roles, internships, and contract positions
- Expected graduation: August 2025 (MS in Information Systems, Northeastern University)
- Based in ${personalInfo.location} with remote work capability

FEATURED PROJECTS:
${projects.map((project, index) => `
${index + 1}. ${project.title} [${project.category}]
   - Description: ${project.description}
   - Technologies: ${project.tags.join(', ')}
   - Impact: ${project.impact}
   - GitHub: ${project.github}`).join('\n')}

PROFESSIONAL EXPERIENCE:
${experiences.map((exp, index) => `
${index + 1}. ${exp.company} - ${exp.role} (${exp.duration})
   - Location: ${exp.location}
   - Description: ${exp.description}
   - Key Metrics: ${Object.entries(exp.metrics).map(([key, value]) => `${key}: ${value}`).join(', ')}
   - Technologies: ${exp.technologies.join(', ')}
   - Top Achievement: ${exp.achievements[0]}`).join('\n')}

TECHNICAL EXPERTISE:
${techStack.map(tech => `- ${tech.title} (${tech.level}, ${tech.years} experience): ${tech.description}`).join('\n')}

CONTACT & HIRING:
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Portfolio: ${personalInfo.website}
- GitHub: ${personalInfo.github}
- LinkedIn: ${personalInfo.linkedin}

CONVERSATION GUIDELINES:
1. Be knowledgeable and professional about ${personalInfo.name}'s background
2. Provide specific, detailed information about projects and achievements
3. Highlight relevant skills and experience based on questions
4. Use metrics and concrete examples when possible
5. Be conversational yet professional
6. Always encourage contacting for opportunities
7. If asked about unavailable information, suggest related topics from the knowledge base

Remember: You represent ${personalInfo.name} professionally. Be helpful, detailed, and encourage meaningful connections.
`;
  }, [personalInfo, projects, experiences, techStack]);

  // Enhanced OpenAI API call with better error handling
  const callOpenAI = useCallback(async (userMessage) => {
    if (!OPENAI_API_KEY) {
      return "OpenAI API key not configured. Set your API key to enable AI-powered responses.";
    }

    try {
      setError(null);
      setIsTyping(true);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: generateAIContext() },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 600,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setIsTyping(false);
      return data.choices[0].message.content;
    } catch (error) {
      setIsTyping(false);
      console.error('OpenAI API Error:', error);
      setError(error.message);
      
      if (error.message.includes('401')) {
        return "Invalid API key. Please check your OpenAI API key configuration.";
      } else if (error.message.includes('429')) {
        return "Rate limit exceeded. Please try again in a moment.";
      } else if (error.message.includes('quota')) {
        return "API quota exceeded. Please check your OpenAI billing.";
      } else {
        return `Error: ${error.message}. Using fallback responses.`;
      }
    }
  }, [OPENAI_API_KEY, generateAIContext]);

  // Enhanced fallback responses with more intelligence
  const getFallbackResponse = useCallback((message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('project')) {
      const projectsByCategory = projects.reduce((acc, project) => {
        if (!acc[project.category]) acc[project.category] = [];
        acc[project.category].push(project);
        return acc;
      }, {});
      
      return `Karthik has developed multiple impressive projects across ${Object.keys(projectsByCategory).length} categories:

${Object.entries(projectsByCategory).map(([category, projs]) => 
  `${category}: ${projs.map(p => p.title).join(', ')}`
).join('\n')}

Featured highlights:
• ${projects[0].title}: ${projects[0].impact}
• ${projects[1].title}: ${projects[1].impact}  
• ${projects[2].title}: ${projects[2].impact}

Each project demonstrates his expertise in modern software development and enterprise-grade solutions. Check his GitHub at ${personalInfo.github} for source code!`;
    } 
    
    else if (lowerMessage.includes('experience')) {
      const totalMetrics = experiences.reduce((acc, exp) => {
        Object.entries(exp.metrics).forEach(([key, value]) => {
          if (!acc[key]) acc[key] = [];
          acc[key].push(value);
        });
        return acc;
      }, {});

      return `Karthik has ${experiences.length} years of professional experience with impressive achievements:

**${experiences[0].company}** (${experiences[0].duration})
   ${experiences[0].role} in ${experiences[0].location}
   Key impact: ${experiences[0].achievements[0]}

**${experiences[1].company}** (${experiences[1].duration})
   ${experiences[1].role} in ${experiences[1].location}
   Key impact: ${experiences[1].achievements[0]}

**Quantified Achievements:**
${Object.entries(totalMetrics).map(([key, values]) => `• ${key}: ${values.join(', ')}`).join('\n')}

Currently pursuing MS in Information Systems at Northeastern University while building enterprise-scale applications.`;
    }
    
    else if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
      const skillsByLevel = techStack.reduce((acc, tech) => {
        if (!acc[tech.level]) acc[tech.level] = [];
        acc[tech.level].push(tech);
        return acc;
      }, {});

      return `Karthik's technical expertise spans ${techStack.length} key areas with ${Object.keys(skillsByLevel).length} proficiency levels:

${Object.entries(skillsByLevel).map(([level, techs]) => 
  `**${level} Level:** ${techs.map(t => `${t.title} (${t.years})`).join(', ')}`
).join('\n')}

**Specialized in:**
• Backend: Java, Spring Boot, microservices architecture
• Databases: MongoDB, MySQL, PostgreSQL, Redis
• Cloud: AWS, GCP, Docker, Kubernetes, Terraform
• Frontend: React, JavaScript, TypeScript

With 3+ years of hands-on experience building scalable, enterprise-grade applications!`;
    }
    
    else if (lowerMessage.includes('java') || lowerMessage.includes('spring')) {
      const javaProjects = projects.filter(p => 
        p.tags.some(tag => tag.toLowerCase().includes('spring') || tag.toLowerCase().includes('java'))
      );

      return `Karthik is a Java expert with ${techStack.find(t => t.title === 'Java').years} years of experience specializing in:

**Java Expertise:**
• Spring Boot, Spring MVC, Spring Cloud
• Microservices architecture and design patterns
• Enterprise-grade application development
• JUnit testing and Maven build tools

**Java Projects:**
${javaProjects.map(p => `• ${p.title}: ${p.description.substring(0, 100)}...`).join('\n')}

**Professional Experience:**
• Mimosa Networks: Built telecom-grade microservices with Spring Boot
• Accenture: Designed distributed microservices for enterprise applications

Recent achievements include ${experiences[0].metrics.improvement} boost in release velocity and ${experiences[1].metrics.throughput} increase in message throughput.`;
    }
    
    else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
      return `Ready to hire Karthik for your next software development project? Here's how to connect:

**Email:** ${personalInfo.email}
**Phone:** ${personalInfo.phone}
**Portfolio:** ${personalInfo.website}
**GitHub:** ${personalInfo.github}
**LinkedIn:** ${personalInfo.linkedin}

**Currently Seeking:**
• Full-time software development roles
• Internship opportunities  
• Contract/freelance projects
• Remote or on-site positions

**Availability:** Graduating August 2025 from Northeastern University
**Location:** ${personalInfo.location} (open to relocation)

**What You Get:**
• ${experiences.length} years of enterprise software development experience
• Multiple production-ready projects across domains in portfolio
• Expertise in Java, Spring Boot, React, and cloud technologies
• Proven track record of improving system performance and scalability

Ready to discuss your project? Reach out today!`;
    }
    
    else {
      return `Hi! I'm Karthik's intelligent portfolio assistant. I can help you learn about:

**Software Projects:**
• SecureChat (messaging app with encryption)
• Soros Chatbot (AI financial analysis)  
• Blog API (Spring Boot REST service)
• Weather App (React + Redis caching)
• Material UI Dashboard (data visualization)
• And 3 more impressive projects!

**Professional Experience:**
• ${experiences[0].company}: ${experiences[0].role} (${experiences[0].location})
• ${experiences[1].company}: ${experiences[1].role} (${experiences[1].location})

**Technical Skills:**
• Backend: Java, Spring Boot, Python
• Frontend: React, JavaScript, TypeScript
• Cloud: AWS, GCP, Docker, Kubernetes
• Databases: MongoDB, MySQL, PostgreSQL, Redis

**Ask me about:**
"Tell me about Karthik's Spring Boot projects"
"What's his experience with microservices?"
"How can I hire him for a Java project?"
"What are his cloud technology skills?"

${OPENAI_API_KEY ? 'Powered by ChatGPT for intelligent responses!' : 'Add your OpenAI API key for AI-powered responses!'}`;
    }
  }, [projects, experiences, techStack, personalInfo, OPENAI_API_KEY]);

  // Enhanced chat message sending with better UX
  const sendChatMessage = useCallback(async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setIsLoading(true);
    setError(null);

    // Add user message immediately
    setChatMessages(prev => [...prev, { 
      text: userMessage, 
      isUser: true, 
      timestamp: new Date().toLocaleTimeString() 
    }]);

    try {
      let aiResponse;
      
      if (OPENAI_API_KEY) {
        aiResponse = await callOpenAI(userMessage);
      } else {
        // Simulate thinking delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1200));
        aiResponse = getFallbackResponse(userMessage);
      }
      
      // Add AI response with typing animation delay
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: aiResponse, 
          isUser: false, 
          timestamp: new Date().toLocaleTimeString(),
          isAI: !!OPENAI_API_KEY
        }]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Chat error:', error);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Sorry, I encountered an error. Please try again or contact Karthik directly!", 
          isUser: false, 
          timestamp: new Date().toLocaleTimeString(),
          isError: true
        }]);
        setIsLoading(false);
      }, 500);
    }
  }, [chatInput, isLoading, OPENAI_API_KEY, callOpenAI, getFallbackResponse]);

  // Enhanced search with debouncing
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Debounce search
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

  // Enhanced navigation with active section tracking
  const navigateToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setShowSearchResults(false);
      setSearchQuery('');
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  // Form handling with validation and email integration
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Debug: Log current configuration
    console.log('Email Configuration Debug:');
    console.log('Service ID:', CONFIG.emailjs.serviceId);
    console.log('Template ID:', CONFIG.emailjs.templateId);
    console.log('Public Key:', CONFIG.emailjs.publicKey ? 'Set' : 'Missing');
    console.log('Environment check:', typeof process !== 'undefined' ? 'Node.js' : 'Browser');
    console.log('Meeting scheduled:', selectedDate && selectedTime ? 'Yes' : 'No');

    try {
      // Check if EmailJS is configured with real credentials
      if (CONFIG.emailjs.serviceId === 'demo_mode' || 
          !CONFIG.emailjs.serviceId || 
          CONFIG.emailjs.serviceId.includes('demo') ||
          CONFIG.emailjs.serviceId.includes('example') ||
          CONFIG.emailjs.serviceId.length < 10) {
        
        // Demo mode - simulate email sending
        console.log('Running in DEMO mode - no real email will be sent');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSubmitStatus('success');
        
        const meetingInfo = selectedDate && selectedTime 
          ? `\n\nMeeting Request:\n• Type: ${meetingType === 'consultation' ? 'Project Consultation' : 
                                        meetingType === 'technical' ? 'Technical Interview' :
                                        meetingType === 'portfolio' ? 'Portfolio Review' : 'Hiring Discussion'}\n• Date: ${new Date(selectedDate).toLocaleDateString()}\n• Time: ${selectedTime} PST\n• Duration: ${meetingType === 'technical' ? '45' : meetingType === 'portfolio' ? '20' : '30'} minutes`
          : '';
        
        setChatMessages(prev => [...prev, {
          text: `Demo Mode: Contact form submitted!\n\nContact Details:\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Company: ${formData.company || 'Not specified'}\n• Subject: ${formData.subject || 'General inquiry'}\n• Message: ${formData.message.substring(0, 100)}...${meetingInfo}\n\nTo enable real emails:\n1. Verify your .env file has valid EmailJS credentials\n2. Restart development server\n3. Service ID should start with 'service_'\n4. Template ID should start with 'template_'`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          isSystem: true
        }]);

        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
        setSelectedDate('');
        setSelectedTime('');
        setShowScheduling(false);

        setTimeout(() => setSubmitStatus(null), 10000);
        return;
      }

      // Real EmailJS integration when environment variables are set
      console.log('Real EmailJS credentials detected - sending actual email...');
      
      const meetingDetails = selectedDate && selectedTime 
        ? {
            meeting_requested: 'Yes',
            meeting_type: meetingType === 'consultation' ? 'Project Consultation' : 
                         meetingType === 'technical' ? 'Technical Interview' :
                         meetingType === 'portfolio' ? 'Portfolio Review' : 'Hiring Discussion',
            meeting_date: new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            meeting_time: selectedTime + ' PST',
            meeting_duration: meetingType === 'technical' ? '45 minutes' : 
                             meetingType === 'portfolio' ? '20 minutes' : '30 minutes'
          }
        : { meeting_requested: 'No' };
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        subject: formData.subject || 'Portfolio Contact Form Inquiry',
        message: formData.message,
        to_name: personalInfo.name,
        to_email: personalInfo.email,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString(),
        website: personalInfo.website,
        ...meetingDetails
      };

      console.log('Email template parameters:', templateParams);

      // Load EmailJS library if not already loaded
      if (!window.emailjs) {
        console.log('Loading EmailJS library from CDN...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('EmailJS library loaded successfully');
            try {
              window.emailjs.init(CONFIG.emailjs.publicKey);
              console.log('EmailJS initialized with public key:', CONFIG.emailjs.publicKey?.substring(0, 8) + '...');
              resolve();
            } catch (initError) {
              console.error('EmailJS initialization failed:', initError);
              reject(initError);
            }
          };
          script.onerror = () => {
            const error = new Error('Failed to load EmailJS library from CDN');
            console.error('Script loading failed:', error);
            reject(error);
          };
          document.head.appendChild(script);
        });
      } else {
        console.log('EmailJS library already loaded, re-initializing...');
        window.emailjs.init(CONFIG.emailjs.publicKey);
      }

      console.log('Attempting to send email via EmailJS...');
      
      // Send email via EmailJS
      const response = await window.emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        templateParams
      );

      console.log('EmailJS response received:', response);

      if (response.status === 200) {
        console.log('Email sent successfully!');
        setSubmitStatus('success');
        
        const meetingConfirmation = selectedDate && selectedTime 
          ? `\n\nMeeting Scheduled:\n• Type: ${meetingDetails.meeting_type}\n• Date: ${meetingDetails.meeting_date}\n• Time: ${meetingDetails.meeting_time}\n• Duration: ${meetingDetails.meeting_duration}\n\nMeeting link will be sent in a separate confirmation email!`
          : '';
        
        setChatMessages(prev => [...prev, {
          text: `Email Sent Successfully!\n\nYour message has been delivered to: ${personalInfo.email}\nFrom: ${formData.name} (${formData.email})\nCompany: ${formData.company || 'Not specified'}\nSubject: ${formData.subject || 'Portfolio Contact Form'}\nSent: ${new Date().toLocaleString()}${meetingConfirmation}\n\nEmailJS Status: ${response.status} - ${response.text}\n\nExpect a response within 24 hours!`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          isSystem: true
        }]);

        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
        setSelectedDate('');
        setSelectedTime('');
        setShowScheduling(false);
      } else {
        throw new Error(`EmailJS returned unexpected status: ${response.status} - ${response.text || 'Unknown error'}`);
      }
      
    } catch (error) {
      console.error('Email submission failed:', error);
      setSubmitStatus('error');
      
      // Add comprehensive error message to chat
      setChatMessages(prev => [...prev, {
        text: `Email Sending Failed\n\nError Details:\n${error.message}\n\nDebug Info:\n• Service ID: ${CONFIG.emailjs.serviceId}\n• Template ID: ${CONFIG.emailjs.templateId}\n• Public Key: ${CONFIG.emailjs.publicKey ? 'Set' : 'Missing'}\n• EmailJS Library: ${window.emailjs ? 'Loaded' : 'Not loaded'}\n\nCommon Solutions:\n• Check EmailJS dashboard for service status\n• Verify template variables match\n• Ensure monthly email quota isn't exceeded\n• Check browser console for detailed errors\n\nDirect Contact:\n${personalInfo.email}\n${personalInfo.phone}\n${personalInfo.linkedin}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      }]);
      
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 10000);
    }
  }, [formData, CONFIG.emailjs, personalInfo, selectedDate, selectedTime, meetingType]);

  // Initialize chatbot with dynamic welcome message
  useEffect(() => {
    setChatMessages([{
      text: `Hi! I'm Karthik's AI assistant with comprehensive knowledge about his multiple software projects across various domains, ${experiences.length} years of professional experience, and technical expertise. ${OPENAI_API_KEY ? 'I\'m powered by ChatGPT for intelligent conversations!' : 'Ask me anything about his background!'}\n\nWhat would you like to know?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      isAI: !!OPENAI_API_KEY
    }]);
  }, [experiences.length, OPENAI_API_KEY]);

  // Enhanced scroll animations with intersection observer
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
  }, []);

  // Auto-scroll chatbot to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Cleanup search timeout
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      color: '#f8fafc',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Enhanced Global Styles */}
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

        /* Enhanced component styles */
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

        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }

        /* Enhanced experience timeline - MODIFIED FOR DATE DISPLAY */
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

        /* NEW: Date badge across the timeline */
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

        /* Enhanced chatbot */
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

        /* Enhanced responsive design */
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

        /* Accessibility improvements */
        .btn:focus,
        .nav-button:focus,
        input:focus,
        textarea:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Enhanced scrollbar */
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

      {/* Enhanced Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 2rem',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div className="logo" onClick={() => navigateToSection('home')}>
            KV
          </div>
          
          <ul className="nav-links" style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            alignItems: 'center',
            margin: 0,
            padding: 0
          }}>
            {['home', 'about', 'experience', 'tech', 'projects', 'contact'].map(section => (
              <li key={section}>
                <button 
                  onClick={() => navigateToSection(section)} 
                  className={`nav-button ${activeSection === section ? 'active' : ''}`}
                >
                  {section === 'tech' ? 'Tech Stack' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Enhanced Search */}
          <div className="search-container" style={{ position: 'relative', marginLeft: '2rem' }}>
            <input
              type="text"
              className="search-box"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search portfolio..."
              style={{
                padding: '0.875rem 1.25rem',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '25px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                outline: 'none',
                transition: 'all 0.4s ease',
                width: '250px',
                backdropFilter: 'blur(10px)',
                fontSize: '1rem'
              }}
            />
            
            {/* Enhanced Search Results */}
            {showSearchResults && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'rgba(15, 23, 42, 0.97)',
                backdropFilter: 'blur(25px)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '20px',
                marginTop: '0.75rem',
                maxHeight: '450px',
                overflowY: 'auto',
                zIndex: 1001,
                animation: 'slideInUp 0.4s ease-out',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
              }}>
                {searchResults.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(203, 213, 225, 0.7)' }}>
                    <div style={{ fontSize: '1.1rem' }}>No results found</div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                      Try searching for "Java", "Projects", or "Experience"
                    </div>
                  </div>
                ) : (
                  searchResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigateToSection(item.section)}
                      style={{
                        padding: '1.5rem',
                        borderBottom: index < searchResults.length - 1 ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: '#f59e0b', 
                        textTransform: 'uppercase', 
                        fontWeight: 700, 
                        marginBottom: '0.5rem',
                        letterSpacing: '1px'
                      }}>
                        {item.category} {item.level && `• ${item.level}`}
                      </div>
                      <div style={{ 
                        fontWeight: 700, 
                        color: '#6366f1', 
                        marginBottom: '0.75rem', 
                        fontSize: '1.1rem' 
                      }}>
                        {item.title}
                      </div>
                      <div style={{ 
                        fontSize: '0.95rem', 
                        color: 'rgba(203, 213, 225, 0.8)', 
                        lineHeight: 1.5 
                      }}>
                        {item.description.substring(0, 150)}...
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="hero" style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 2, animation: 'fadeInUp 1s ease-out', maxWidth: '1200px', padding: '0 2rem' }}>
          <h1>{personalInfo.name}</h1>
          <p className="subtitle">{personalInfo.title}</p>
          <div style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(203, 213, 225, 0.9)', 
            marginBottom: '3rem', 
            opacity: 0, 
            animation: 'fadeInUp 1s ease-out 0.8s both',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            MS Student at Northeastern University | {personalInfo.location}
          </div>
          <div className="cta-buttons">
            <button onClick={() => navigateToSection('projects')} className="btn btn-primary">
              <span>Explore Projects</span>
            </button>
            <button onClick={() => navigateToSection('contact')} className="btn btn-secondary">
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">About Me - Your Next Software Developer</h2>
        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ 
            fontSize: '1.5rem', 
            lineHeight: 1.8, 
            marginBottom: '3rem', 
            fontWeight: 400,
            color: 'rgba(248, 250, 252, 0.95)'
          }}>
            I'm <strong style={{ color: '#6366f1' }}>{personalInfo.name}</strong>, a dedicated 
            <strong style={{ color: '#8b5cf6' }}> Software Developer</strong> currently based in 
            <strong style={{ color: '#f59e0b' }}> {personalInfo.location}</strong> with 
            <strong style={{ color: '#10b981' }}> 3+ years of professional experience</strong> building 
            scalable backend systems and enterprise-grade applications.
          </p>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.08)', 
            padding: '3rem', 
            borderRadius: '24px', 
            border: '1px solid rgba(255, 255, 255, 0.15)',
            marginBottom: '3rem',
            backdropFilter: 'blur(15px)'
          }}>
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.8, 
              color: 'rgba(248, 250, 252, 0.9)' 
            }}>
              {personalInfo.summary}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#8b5cf6' }}>3+</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Years Experience</div>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f59e0b' }}>{experiences.length}</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Companies</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.3)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ color: '#6366f1', marginBottom: '1rem', fontSize: '1.3rem' }}>Backend Expertise</h3>
              <p style={{ lineHeight: 1.6 }}>Java, Spring Boot, Spring Cloud, Microservices Architecture, RESTful APIs, JWT Authentication</p>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(139, 92, 246, 0.3)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.3rem' }}>Cloud & DevOps</h3>
              <p style={{ lineHeight: 1.6 }}>AWS, Google Cloud Platform, Docker, Kubernetes, Terraform, CI/CD Pipelines, Infrastructure Automation</p>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.3)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.3rem' }}>Data & Analytics</h3>
              <p style={{ lineHeight: 1.6 }}>MongoDB, MySQL, PostgreSQL, Cassandra, Redis, Apache Kafka, Prometheus, Grafana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section with Date Badges */}
      <section id="experience" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">Professional Experience</h2>
        <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '5rem', color: 'rgba(203, 213, 225, 0.9)', maxWidth: '800px', margin: '0 auto 5rem', lineHeight: 1.7 }}>
          My journey through the tech industry, building innovative solutions and achieving measurable impact
        </p>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="experience-item">
              {/* Date Badge positioned across the timeline */}
              <div className="experience-date-badge">
                {exp.duration}
              </div>
              
              <div className="experience-content">
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#6366f1', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span>{exp.company}</span>
                    <span style={{ fontSize: '1rem', color: 'rgba(203, 213, 225, 0.7)', fontWeight: 500 }}>
                      • {exp.location}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.4rem', color: '#f59e0b', marginBottom: '0.5rem', fontWeight: 600 }}>
                    {exp.role}
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.05rem', color: 'rgba(248, 250, 252, 0.9)' }}>
                  {exp.description}
                </div>
                
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: '#f59e0b', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 700 }}>
                    Key Achievements
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} style={{
                        position: 'relative',
                        paddingLeft: '2.5rem',
                        marginBottom: '1rem',
                        lineHeight: 1.7,
                        fontSize: '1rem',
                        color: 'rgba(248, 250, 252, 0.9)'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#6366f1',
                          fontSize: '1.1rem',
                          top: '0.1rem'
                        }}>▶</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 style={{ 
                    color: '#8b5cf6', 
                    marginBottom: '1rem', 
                    fontSize: '1rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}>
                    Technologies Used
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} style={{
                        background: 'rgba(99, 102, 241, 0.2)',
                        color: '#6366f1',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        border: '1px solid rgba(99, 102, 241, 0.3)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="experience-dot"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Tech Stack Section */}
      <section id="tech" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">My Technology Stack & Skills</h2>
        <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '5rem', color: 'rgba(203, 213, 225, 0.9)', maxWidth: '800px', margin: '0 auto 5rem', lineHeight: 1.7 }}>
          Cutting-edge technologies I use to build modern, scalable applications with proven expertise levels
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
          {techStack.map((tech, index) => (
            <div key={index} className="tech-item">
              <i className={tech.icon}></i>
              <h3 style={{ marginBottom: '1rem', color: '#6366f1', fontSize: '1.5rem', fontWeight: 700 }}>{tech.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  color: '#10b981', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  {tech.level}
                </span>
                <span style={{ 
                  background: 'rgba(245, 158, 11, 0.2)', 
                  color: '#f59e0b', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  {tech.years} exp
                </span>
              </div>
              <p style={{ fontSize: '1rem', color: 'rgba(248, 250, 252, 0.85)', lineHeight: 1.7 }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title">Featured Projects & Case Studies</h2>
        <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '5rem', color: 'rgba(203, 213, 225, 0.9)', maxWidth: '800px', margin: '0 auto 5rem', lineHeight: 1.7 }}>
          Real-world applications built with modern technologies and best practices (multiple projects showcasing full-stack expertise)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: '#f59e0b', fontSize: '1.6rem', lineHeight: 1.3, flex: 1, fontWeight: 700 }}>
                    {project.title}
                  </h3>
                  <span style={{ 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    color: '#6366f1', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginLeft: '1rem',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}>
                    {project.category}
                  </span>
                </div>
                
                <p style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(248, 250, 252, 0.9)' }}>
                  {project.description}
                </p>
                
                <div style={{ 
                  background: 'rgba(99, 102, 241, 0.15)', 
                  padding: '1rem', 
                  borderRadius: '15px', 
                  marginBottom: '2rem',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#6366f1', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Impact & Results
                  </div>
                  <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }}>
                    {project.impact}
                  </div>
                </div>
                
                <div style={{ margin: '2rem 0' }}>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(203, 213, 225, 0.8)', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
                    Technologies
                  </div>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} style={{
                      background: `rgba(${tagIndex === 0 ? '139, 92, 246' : tagIndex === 1 ? '99, 102, 241' : '245, 158, 11'}, 0.2)`,
                      color: `${tagIndex === 0 ? '#8b5cf6' : tagIndex === 1 ? '#6366f1' : '#f59e0b'}`,
                      padding: '0.6rem 1.2rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      marginRight: '0.75rem',
                      marginBottom: '0.75rem',
                      display: 'inline-block',
                      fontWeight: 500,
                      border: `1px solid rgba(${tagIndex === 0 ? '139, 92, 246' : tagIndex === 1 ? '99, 102, 241' : '245, 158, 11'}, 0.3)`
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#6366f1', 
                    textDecoration: 'none', 
                    fontWeight: 600, 
                    transition: 'all 0.4s ease',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderRadius: '15px',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ 
                    color: '#8b5cf6', 
                    textDecoration: 'none', 
                    fontWeight: 600, 
                    transition: 'all 0.4s ease',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(139, 92, 246, 0.15)',
                    borderRadius: '15px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="fab fa-github"></i> Source Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Enhanced Contact Section with Optional Scheduling */}
      <section id="contact" className="reveal" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title">Get In Touch - Let's Build Something Amazing</h2>
        <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '5rem', color: 'rgba(203, 213, 225, 0.9)', maxWidth: '800px', margin: '0 auto 5rem', lineHeight: 1.7 }}>
          Ready to start your next project? I'm actively seeking <strong style={{ color: '#8b5cf6' }}>software development opportunities</strong>, 
          <strong style={{ color: '#6366f1' }}> internships</strong>, and <strong style={{ color: '#f59e0b' }}>full-time positions</strong>. 
          Expected graduation: August 2025.
        </p>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '3.5rem',
          borderRadius: '30px',
          border: '2px solid rgba(99, 102, 241, 0.2)',
          maxWidth: '700px',
          margin: '0 auto',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        }}>
          {[
            { name: 'name', label: 'Full Name *', type: 'text', required: true, placeholder: 'Your full name' },
            { name: 'email', label: 'Email Address *', type: 'email', required: true, placeholder: 'your.email@company.com' },
            { name: 'company', label: 'Company/Organization', type: 'text', required: false, placeholder: 'Your company name (optional)' },
            { name: 'subject', label: 'Project Subject', type: 'text', required: false, placeholder: 'Brief project description' },
          ].map((field, index) => (
            <div key={index} style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: '#f59e0b', fontWeight: 700, fontSize: '1rem' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#f8fafc',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
          ))}
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', color: '#f59e0b', fontWeight: 700, fontSize: '1rem' }}>
              Project Details *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Tell me about your project requirements, timeline, budget, and any specific technologies you'd like to use..."
              style={{
                width: '100%',
                padding: '1.25rem',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                resize: 'vertical',
                minHeight: '140px',
                lineHeight: 1.6
              }}
            />
          </div>

          {/* Optional Meeting Scheduling Section */}
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '2px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                Optional: Schedule a Meeting
              </h3>
              <button
                onClick={() => setShowScheduling(!showScheduling)}
                style={{
                  background: showScheduling ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '25px',
                  color: '#10b981',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                {showScheduling ? 'Hide Calendar' : 'Add Meeting'}
              </button>
            </div>
            
            <p style={{ color: 'rgba(203, 213, 225, 0.8)', fontSize: '0.95rem', marginBottom: showScheduling ? '1.5rem' : 0 }}>
              Want to discuss your project in person? Schedule a meeting along with your message!
            </p>

            {showScheduling && (
              <div style={{ animation: 'slideInUp 0.3s ease-out' }}>
                {/* Meeting Type Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>
                    Meeting Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {[
                      { id: 'consultation', title: 'Project Consultation', desc: '30 min discussion' },
                      { id: 'technical', title: 'Technical Interview', desc: '45 min technical chat' },
                      { id: 'portfolio', title: 'Portfolio Review', desc: '20 min walkthrough' },
                      { id: 'hiring', title: 'Hiring Discussion', desc: '30 min role chat' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setMeetingType(type.id)}
                        style={{
                          padding: '0.75rem',
                          background: meetingType === type.id 
                            ? 'rgba(16, 185, 129, 0.3)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${meetingType === type.id 
                            ? 'rgba(16, 185, 129, 0.5)' 
                            : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: '12px',
                          color: meetingType === type.id ? '#10b981' : '#e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{type.title}</div>
                        <div style={{ opacity: 0.8 }}>{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>
                      Preferred Time (PST)
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <option value="">Select time...</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Meeting Summary */}
                {selectedDate && selectedTime && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                    <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      Meeting Summary:
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      <strong>Type:</strong> {meetingType === 'consultation' ? 'Project Consultation' : 
                                              meetingType === 'technical' ? 'Technical Interview' :
                                              meetingType === 'portfolio' ? 'Portfolio Review' : 'Hiring Discussion'}<br/>
                      <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}<br/>
                      <strong>Time:</strong> {selectedTime} (Pacific Time)<br/>
                      <strong>Duration:</strong> {meetingType === 'technical' ? '45' : meetingType === 'portfolio' ? '20' : '30'} minutes
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1.5rem',
              background: isSubmitting ? '#6b7280' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.5s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Request
              </>
            )}
          </button>

          {/* Status Messages */}
          {submitStatus && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '15px',
              textAlign: 'center',
              fontWeight: 600,
              background: submitStatus === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid rgba(${submitStatus === 'success' ? '16, 185, 129' : '239, 68, 68'}, 0.3)`,
              color: submitStatus === 'success' ? '#10b981' : '#ef4444'
            }}>
              {submitStatus === 'success' ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-check-circle"></i>
                  <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-exclamation-circle"></i>
                  <span>Failed to send message. Please try again or contact me directly via email.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '3rem', fontSize: '2rem', fontWeight: 700 }}>
            Other Ways to Connect
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem', 
            maxWidth: '1000px', 
            margin: '0 auto' 
          }}>
            <a href={`mailto:${personalInfo.email}`} style={{ 
              color: '#6366f1', 
              textDecoration: 'none', 
              fontSize: '1rem',
              padding: '2rem',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '20px',
              border: '2px solid rgba(99, 102, 241, 0.2)',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}>
              <div style={{ 
                background: 'rgba(99, 102, 241, 0.2)', 
                padding: '1rem', 
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px',
                height: '60px'
              }}>
                <i className="fas fa-envelope" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Email</div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{personalInfo.email}</div>
              </div>
            </a>
            
            <a href={`tel:${personalInfo.phone}`} style={{ 
              color: '#8b5cf6', 
              textDecoration: 'none', 
              fontSize: '1rem',
              padding: '2rem',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '20px',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}>
              <div style={{ 
                background: 'rgba(139, 92, 246, 0.2)', 
                padding: '1rem', 
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px',
                height: '60px'
              }}>
                <i className="fas fa-phone" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Phone</div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{personalInfo.phone}</div>
              </div>
            </a>
            
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ 
              color: '#0077b5', 
              textDecoration: 'none', 
              fontSize: '1rem',
              padding: '2rem',
              background: 'rgba(0, 119, 181, 0.1)',
              borderRadius: '20px',
              border: '2px solid rgba(0, 119, 181, 0.2)',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}>
              <div style={{ 
                background: 'rgba(0, 119, 181, 0.2)', 
                padding: '1rem', 
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px',
                height: '60px'
              }}>
                <i className="fab fa-linkedin" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>LinkedIn</div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>Professional Profile</div>
              </div>
            </a>
            
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ 
              color: '#f59e0b', 
              textDecoration: 'none', 
              fontSize: '1rem',
              padding: '2rem',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '20px',
              border: '2px solid rgba(245, 158, 11, 0.2)',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}>
              <div style={{ 
                background: 'rgba(245, 158, 11, 0.2)', 
                padding: '1rem', 
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60px',
                height: '60px'
              }}>
                <i className="fab fa-github" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>GitHub</div>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>Source Code Portfolio</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced AI Chatbot */}
      <div style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 1000 }}>
        <button className="chatbot-toggle" onClick={() => setChatbotOpen(!chatbotOpen)}>
          <i className="fas fa-comments"></i>
        </button>
        
        {chatbotOpen && (
          <div style={{
            position: 'absolute',
            bottom: '90px',
            right: 0,
            width: '450px',
            height: '700px',
            background: 'rgba(15, 23, 42, 0.97)',
            backdropFilter: 'blur(25px)',
            borderRadius: '30px',
            border: '2px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
          }}>
            {/* Enhanced Header */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <div style={{ fontSize: '1.1rem' }}>
                  AI Assistant {OPENAI_API_KEY ? '(ChatGPT)' : '(Smart Mode)'}
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.25rem' }}>
                  {OPENAI_API_KEY ? 'Powered by OpenAI' : `Multiple projects across domains • ${experiences.length} companies`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setChatMessages([{
                    text: `Chat cleared! I'm Karthik's AI assistant with comprehensive knowledge about his projects, experience, and skills. What would you like to know?`,
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString(),
                    isAI: !!OPENAI_API_KEY
                  }])}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    border: 'none', 
                    color: 'white', 
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                  }}
                  title="Clear Chat"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setChatbotOpen(false)}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    border: 'none', 
                    color: 'white', 
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Enhanced Messages */}
            <div 
              ref={chatMessagesRef}
              style={{
                flex: 1,
                padding: '1.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '20px',
                    maxWidth: '85%',
                    background: message.isUser 
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.3))' 
                      : message.isError 
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                        : message.isSystem
                          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
                          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                    animation: 'fadeInUp 0.4s ease-out',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    border: `1px solid ${message.isUser 
                      ? 'rgba(245, 158, 11, 0.4)' 
                      : message.isError 
                        ? 'rgba(239, 68, 68, 0.4)'
                        : message.isSystem
                          ? 'rgba(99, 102, 241, 0.4)'
                          : 'rgba(99, 102, 241, 0.4)'}`,
                    color: message.isUser ? '#fbbf24' : '#e2e8f0'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    opacity: 0.7, 
                    marginTop: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{message.timestamp}</span>
                    {(message.isAI || message.isError || message.isSystem) && (
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(99, 102, 241, 0.3)',
                        borderRadius: '10px',
                        fontSize: '0.7rem'
                      }}>
                        {message.isAI ? 'AI' : message.isError ? 'Error' : 'System'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '20px',
                  maxWidth: '85%',
                  alignSelf: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  animation: 'pulse 2s infinite'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                    borderTop: '2px solid #6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ fontSize: '0.95rem' }}>
                    {isTyping ? 'AI is analyzing and crafting response...' : 'Processing your question...'}
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Input */}
            <div style={{ padding: '1.5rem', borderTop: '2px solid rgba(99, 102, 241, 0.2)' }}>
              {error && (
                <div style={{ 
                  background: 'rgba(239, 68, 68, 0.15)', 
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.75rem', 
                  borderRadius: '12px', 
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  color: '#fca5a5'
                }}>
                  Warning: {error}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendChatMessage()}
                  placeholder="Ask me anything about Karthik..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#f8fafc',
                    outline: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={isLoading || !chatInput.trim()}
                  style={{
                    padding: '1rem 1.5rem',
                    background: isLoading || !chatInput.trim() ? '#6b7280' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    borderRadius: '25px',
                    color: 'white',
                    cursor: isLoading || !chatInput.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.4s ease',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              
              {/* Quick Actions */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '0.75rem', 
                marginTop: '1rem'
              }}>
                {[
                  { label: 'Projects', prompt: `Tell me about Karthik's software projects in detail` },
                  { label: 'Experience', prompt: 'What is Karthik\'s professional experience and achievements?' },
                  { label: 'Skills', prompt: 'What are Karthik\'s technical skills and expertise levels?' },
                  { label: 'Contact', prompt: 'How can I contact Karthik for a project or meeting?' }
                ].map(action => (
                  <button
                    key={action.label}
                    onClick={() => {
                      if (action.label === 'Contact') {
                        setChatbotOpen(false);
                        navigateToSection('contact');
                      } else {
                        setChatInput(action.prompt);
                        setTimeout(() => sendChatMessage(), 100);
                      }
                    }}
                    disabled={isLoading}
                    style={{
                      padding: '0.5rem 1rem',
                      background: action.label === 'Contact' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                      border: `1px solid ${action.label === 'Contact' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                      borderRadius: '20px',
                      color: action.label === 'Contact' ? '#10b981' : '#6366f1',
                      fontSize: '0.85rem',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: 500
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              
              {/* Status indicator */}
              <div style={{ 
                marginTop: '1rem', 
                fontSize: '0.75rem', 
                color: 'rgba(203, 213, 225, 0.6)',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                lineHeight: 1.4
              }}>
                {OPENAI_API_KEY ? (
                  <span>AI Powered by ChatGPT - Ask me anything!</span>
                ) : (
                  <span>Smart Mode Active • Set API key in CONFIG for AI enhancement</span>
                )}
                <br />
                This chatbot has deep knowledge about Karthik's portfolio—test it out!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

export default Portfolio;
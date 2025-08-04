// utils/chatUtils.js
import { personalInfo, projects, experiences, techStack } from '../../components/data/portfolioData';
import { CONFIG } from '../../components/config/config'

export const generateAIContext = () => {
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
};

export const callOpenAI = async (userMessage) => {
  const OPENAI_API_KEY = CONFIG.openai.apiKey;
  
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  try {
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.message.includes('401')) {
      throw new Error("Invalid API key. Please check your OpenAI API key configuration.");
    } else if (error.message.includes('429')) {
      throw new Error("Rate limit exceeded. Please try again in a moment.");
    } else if (error.message.includes('quota')) {
      throw new Error("API quota exceeded. Please check your OpenAI billing.");
    } else {
      throw new Error(`Error: ${error.message}. Using fallback responses.`);
    }
  }
};

export const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('project')) {
    return getProjectsResponse();
  } 
  else if (lowerMessage.includes('experience')) {
    return getExperienceResponse();
  }
  else if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
    return getSkillsResponse();
  }
  else if (lowerMessage.includes('java') || lowerMessage.includes('spring')) {
    return getJavaResponse();
  }
  else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
    return getContactResponse();
  }
  else {
    return getDefaultResponse();
  }
};

const getProjectsResponse = () => {
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
};

const getExperienceResponse = () => {
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
};

const getSkillsResponse = () => {
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
};

const getJavaResponse = () => {
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
};

const getContactResponse = () => {
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
};

const getDefaultResponse = () => {
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

${CONFIG.openai.apiKey ? 'Powered by ChatGPT for intelligent responses!' : 'Add your OpenAI API key for AI-powered responses!'}`;
};
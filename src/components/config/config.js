export const CONFIG = {
    // OpenAI API Configuration
    openai: {
      apiKey: process.env?.REACT_APP_OPENAI_API_KEY
    },
    // EmailJS Configuration  
    emailjs: {
      serviceId: process.env?.REACT_APP_EMAILJS_SERVICE_ID,
      templateId: process.env?.REACT_APP_EMAILJS_TEMPLATE_ID,
      publicKey: process.env?.REACT_APP_EMAILJS_PUBLIC_KEY
    } 
  };
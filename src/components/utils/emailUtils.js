// utils/emailUtils.js - Fixed version without meeting functionality
export const sendEmail = async ({ 
    name, 
    email, 
    company, 
    subject, 
    message, 
    personalInfo,
    config 
  }) => {
    console.log('Email Configuration Debug:');
    console.log('Service ID:', config.serviceId);
    console.log('Template ID:', config.templateId);
    console.log('Public Key:', config.publicKey ? 'Set' : 'Missing');
  
    try {
      // Load EmailJS if not already loaded
      if (!window.emailjs) {
        console.log('Loading EmailJS library from CDN...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log('EmailJS library loaded successfully');
            try {
              window.emailjs.init(config.publicKey);
              console.log('EmailJS initialized');
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
        window.emailjs.init(config.publicKey);
      }
  
      // Simple template params - no meeting functionality
      const templateParams = {
        from_name: name,
        from_email: email,
        company: company || 'Not specified',
        subject: subject || 'Portfolio Contact Form Inquiry',
        message: message,
        to_name: personalInfo.name,
        to_email: personalInfo.email,
        reply_to: email,
        timestamp: new Date().toLocaleString(),
        website: personalInfo.website
      };
  
      console.log('Template params being sent:', templateParams);
  
      console.log('Sending email via EmailJS...');
      const response = await window.emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams
      );
  
      console.log('EmailJS response:', response);
      return response.status === 200;
  
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  };
import { useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../../components/config/config'
import { callOpenAI, getFallbackResponse } from '../utils/chatUtils';

export const useChatbot = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    if (!message?.trim() || isLoading) return;

    const userMessage = message.trim();
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
      
      if (CONFIG.openai.apiKey) {
        setIsTyping(true);
        aiResponse = await callOpenAI(userMessage);
        setIsTyping(false);
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
          isAI: !!CONFIG.openai.apiKey
        }]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "Sorry, I encountered an error. Please try again or contact Karthik directly!", 
          isUser: false, 
          timestamp: new Date().toLocaleTimeString(),
          isError: true
        }]);
        setIsLoading(false);
        setIsTyping(false);
      }, 500);
    }
  }, [isLoading]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    setChatMessages([{
      text: `Hi! I'm Karthik's AI assistant with comprehensive knowledge about his projects, experience, and skills. ${CONFIG.openai.apiKey ? 'I\'m powered by ChatGPT!' : 'Ask me anything!'}\n\nWhat would you like to know?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      isAI: !!CONFIG.openai.apiKey
    }]);
  }, []);

  return {
    chatbotOpen,
    setChatbotOpen,
    chatMessages,
    setChatMessages,
    isLoading,
    isTyping,
    error,
    sendMessage
  };
};
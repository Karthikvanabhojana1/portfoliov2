import React, { useRef, useEffect, useState } from 'react';

const CONFIG = {
  openai: {
    apiKey: process.env?.REACT_APP_OPENAI_API_KEY
  }
};

const Chatbot = ({ 
  chatbotOpen, 
  setChatbotOpen, 
  chatMessages, 
  setChatMessages,
  sendMessage, 
  personalInfo,
  isLoading,
  error,
  navigateToSection
}) => {
  const chatMessagesRef = useRef(null);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const clearChat = () => {
    setChatMessages([{
      text: `Chat cleared! I'm Karthik's AI assistant with comprehensive knowledge about his projects, experience, and skills. What would you like to know?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      isAI: !!CONFIG.openai.apiKey
    }]);
  };

  const handleSend = () => {
    if (!chatInput.trim() || isLoading) return;
    const message = chatInput.trim();
    setChatInput('');
    sendMessage(message);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button 
        className="chatbot-toggle" 
        onClick={() => setChatbotOpen(!chatbotOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none',
          color: 'white',
          fontSize: '1.4rem',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
          animation: 'pulse 2s infinite'
        }}
      >
        <i className="fas fa-comments"></i>
      </button>
      
      {chatbotOpen && (
        <div className="chatbot-window" style={{
          position: 'absolute',
          bottom: '80px',
          right: 0,
          width: '550px',
          height: '650px',
          maxWidth: '90vw',
          maxHeight: '85vh',
          background: 'rgba(15, 23, 42, 0.97)',
          backdropFilter: 'blur(25px)',
          borderRadius: '24px',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}>
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
                AI Assistant {CONFIG.openai.apiKey ? '(ChatGPT)' : '(Smart Mode)'}
              </div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.25rem' }}>
                {CONFIG.openai.apiKey ? 'Powered by OpenAI' : 'Intelligent responses about Karthik'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={clearChat}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  color: 'white', 
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer', 
                  fontSize: '0.8rem'
                }}
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
                  fontSize: '1.2rem'
                }}
              >
                ×
              </button>
            </div>
          </div>
          
          <div 
            ref={chatMessagesRef}
            style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              minHeight: 0
            }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '18px',
                  maxWidth: '90%',
                  background: message.isUser 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.3))' 
                    : message.isError 
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  border: `1px solid ${message.isUser 
                    ? 'rgba(245, 158, 11, 0.4)' 
                    : message.isError 
                      ? 'rgba(239, 68, 68, 0.4)'
                      : 'rgba(99, 102, 241, 0.4)'}`,
                  color: message.isUser ? '#fbbf24' : '#e2e8f0',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                <div style={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </div>
                <div style={{ 
                  fontSize: '0.75rem',
                  opacity: 0.7, 
                  marginTop: '0.75rem',
                  textAlign: 'right'
                }}>
                  {message.timestamp}
                  {(message.isAI || message.isError || message.isSystem) && (
                    <span style={{
                      marginLeft: '1rem',
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
            
            {isLoading && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                padding: '1.25rem 1.5rem',
                borderRadius: '18px',
                maxWidth: '90%',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
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
                  Processing your question...
                </span>
              </div>
            )}
          </div>

          <div style={{ 
            padding: '1.5rem',
            borderTop: '2px solid rgba(99, 102, 241, 0.2)'
          }}>
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
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask me anything about Karthik..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '1rem 1.25rem',
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '25px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#f8fafc',
                  outline: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !chatInput.trim()}
                style={{
                  padding: '1rem 1.5rem',
                  background: isLoading || !chatInput.trim() ? '#6b7280' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: isLoading || !chatInput.trim() ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.4s ease'
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem', 
              marginTop: '1rem',
              justifyContent: 'center'
            }}>
              {['Projects', 'Experience', 'Skills'].map(action => (
                <button
                  key={action}
                  onClick={() => {
                    if (action === 'Contact') {
                      setChatbotOpen(false);
                      if (navigateToSection) {
                        navigateToSection('contact');
                      }
                    } else {
                      const prompts = {
                        'Projects': `Tell me about Karthik's software projects in detail`,
                        'Experience': 'What is Karthik\'s professional experience and achievements?',
                        'Skills': 'What are Karthik\'s technical skills and expertise levels?'
                      };
                      sendMessage(prompts[action]);
                    }
                  }}
                  disabled={isLoading}
                  style={{
                    padding: '0.5rem 1rem',
                    background: action === 'Contact' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                    border: `1px solid ${action === 'Contact' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                    borderRadius: '20px',
                    color: action === 'Contact' ? '#10b981' : '#6366f1',
                    fontSize: '0.85rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    opacity: isLoading ? 0.6 : 1
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
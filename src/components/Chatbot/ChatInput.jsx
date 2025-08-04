import React, { useState } from 'react';

import QuickActions from './QuickActions';
import { CONFIG } from '../../components/config/config';


const ChatInput = ({ sendMessage, isLoading, error, navigateToSection }) => {
  const [chatInput, setChatInput] = useState('');

  const handleSend = () => {
    if (!chatInput.trim() || isLoading) return;
    
    const message = chatInput.trim();
    setChatInput('');
    sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const setQuickMessage = (message) => {
    setChatInput(message);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div style={{ padding: '1.5rem', borderTop: '2px solid rgba(99, 102, 241, 0.2)' }}>
      {error && <ErrorMessage error={error} />}
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleKeyPress}
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
          onClick={handleSend}
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
      
      <QuickActions 
        setQuickMessage={setQuickMessage}
        navigateToSection={navigateToSection}
        isLoading={isLoading}
      />
      
      <StatusIndicator />
    </div>
  );
};

const ErrorMessage = ({ error }) => {
  return (
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
  );
};

const StatusIndicator = () => {
  return (
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
      {CONFIG.openai.apiKey ? (
        <span>AI Powered by ChatGPT - Ask me anything!</span>
      ) : (
        <span>Smart Mode Active • Set API key in CONFIG for AI enhancement</span>
      )}
    </div>
  );
};

export default ChatInput;
// components/Chatbot/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div style={{
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
    }}>
      <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
      <MessageTimestamp message={message} />
    </div>
  );
};

const MessageTimestamp = ({ message }) => {
  return (
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
  );
};

export default ChatMessage;

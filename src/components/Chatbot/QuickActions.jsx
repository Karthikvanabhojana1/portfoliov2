import React from 'react';

const QuickActions = ({ setQuickMessage, navigateToSection, isLoading }) => {
  const quickActions = [
    { 
      label: 'Projects', 
      prompt: `Tell me about Karthik's software projects in detail`,
      action: 'message'
    },
    { 
      label: 'Experience', 
      prompt: 'What is Karthik\'s professional experience and achievements?',
      action: 'message'
    },
    { 
      label: 'Skills', 
      prompt: 'What are Karthik\'s technical skills and expertise levels?',
      action: 'message'
    },
    { 
      label: 'Contact', 
      prompt: 'How can I contact Karthik?',
      action: 'message'
    }
  ];

  const handleQuickAction = (action) => {
    if (action.action === 'navigate') {
      navigateToSection('contact');
    } else {
      setQuickMessage(action.prompt);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: '0.75rem', 
      marginTop: '1rem'
    }}>
      {quickActions.map(action => (
        <button
          key={action.label}
          onClick={() => handleQuickAction(action)}
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
  );
};

export default QuickActions;
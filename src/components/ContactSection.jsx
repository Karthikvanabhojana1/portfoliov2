// components/ContactForm.jsx - Removed meeting functionality
import React from 'react';
import { useContactForm } from './../components/hooks/useContact';

const ContactForm = ({ personalInfo }) => {
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  } = useContactForm(personalInfo);

  const formFields = [
    { name: 'name', label: 'Full Name *', type: 'text', required: true, placeholder: 'Your full name' },
    { name: 'email', label: 'Email Address *', type: 'email', required: true, placeholder: 'your.email@company.com' },
    { name: 'company', label: 'Company/Organization', type: 'text', required: false, placeholder: 'Your company name (optional)' },
    { name: 'subject', label: 'Project Subject', type: 'text', required: false, placeholder: 'Brief project description' },
  ];

  return (
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
      {formFields.map((field, index) => (
        <FormField
          key={index}
          field={field}
          value={formData[field.name]}
          onChange={handleInputChange}
        />
      ))}
      
      <MessageField
        value={formData.message}
        onChange={handleInputChange}
      />

      <SubmitButton
        onClick={() => handleSubmit(formData)}
        isSubmitting={isSubmitting}
      />

      <StatusMessage submitStatus={submitStatus} />
    </div>
  );
};

const FormField = ({ field, value, onChange }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.75rem', 
        color: '#f59e0b', 
        fontWeight: 700, 
        fontSize: '1rem' 
      }}>
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
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
  );
};

const MessageField = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.75rem', 
        color: '#f59e0b', 
        fontWeight: 700, 
        fontSize: '1rem' 
      }}>
        Project Details *
      </label>
      <textarea
        name="message"
        value={value}
        onChange={onChange}
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
  );
};

const SubmitButton = ({ onClick, isSubmitting }) => {
  return (
    <button 
      onClick={onClick}
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
  );
};

const StatusMessage = ({ submitStatus }) => {
  if (!submitStatus) return null;

  const isSuccess = submitStatus === 'success';
  
  return (
    <div style={{
      marginTop: '1.5rem',
      padding: '1rem',
      borderRadius: '15px',
      textAlign: 'center',
      fontWeight: 600,
      background: isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      border: `1px solid rgba(${isSuccess ? '16, 185, 129' : '239, 68, 68'}, 0.3)`,
      color: isSuccess ? '#10b981' : '#ef4444'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <i className={`fas fa-${isSuccess ? 'check' : 'exclamation'}-circle`}></i>
        <span>
          {isSuccess 
            ? "Message sent successfully! I'll get back to you within 24 hours."
            : "Failed to send message. Please try again or contact me directly via email."
          }
        </span>
      </div>
    </div>
  );
};

export default ContactForm;
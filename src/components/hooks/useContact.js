import { useState, useCallback } from 'react';
import { CONFIG } from '../config/config';
import { sendEmail } from '../utils/emailUtils';

export const useContactForm = (personalInfo) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (submissionData = formData) => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const success = await sendEmail({
        ...submissionData,
        personalInfo,
        config: CONFIG.emailjs
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 10000);
    }
  }, [formData, personalInfo, validateForm]);

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  };
};
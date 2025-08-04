import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [showScheduling, setShowScheduling] = useState(false);
  const [meetingType, setMeetingType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // simulate submission delay
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 px-4 max-w-6xl mx-auto text-white">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Get In Touch - Let's Build Something Amazing
      </h2>
      <p className="text-lg text-center text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
        Ready to start your next project? I'm actively seeking <span className="text-purple-400 font-semibold">software development opportunities</span>,
        <span className="text-indigo-400 font-semibold"> internships</span>, and <span className="text-amber-400 font-semibold">full-time positions</span>. Expected graduation: August 2025.
      </p>

      <div className="bg-white/5 border border-indigo-400/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto">
        {[
          { name: 'name', label: 'Full Name *', type: 'text', required: true, placeholder: 'Your full name' },
          { name: 'email', label: 'Email Address *', type: 'email', required: true, placeholder: 'your.email@company.com' },
          { name: 'company', label: 'Company/Organization', type: 'text', required: false, placeholder: 'Your company name (optional)' },
          { name: 'subject', label: 'Project Subject', type: 'text', required: false, placeholder: 'Brief project description' },
        ].map((field, idx) => (
          <div className="mb-6" key={idx}>
            <label className="block text-amber-400 font-semibold mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-indigo-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-amber-400 font-semibold mb-2">Project Details *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="6"
            placeholder="Tell me about your project requirements, timeline, budget, and any specific technologies you'd like to use..."
            className="w-full px-5 py-3 rounded-xl bg-white/10 border border-indigo-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y min-h-[140px]"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 font-bold rounded-xl transition-all duration-500 text-lg flex items-center justify-center gap-3 ${isSubmitting ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500'}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Submit Request
            </>
          )}
        </button>

        {submitStatus && (
          <div className={`mt-6 text-center py-4 rounded-xl font-semibold ${submitStatus === 'success' ? 'text-green-400 bg-green-900/30 border border-green-600/30' : 'text-red-400 bg-red-900/30 border border-red-600/30'}`}>
            {submitStatus === 'success' ? (
              <><i className="fas fa-check-circle mr-2"></i>Message sent successfully! I'll get back to you within 24 hours.</>
            ) : (
              <><i className="fas fa-exclamation-circle mr-2"></i>Failed to send message. Please try again or contact me directly via email.</>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;

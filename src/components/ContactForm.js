import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'Message sent!' : 'Failed to send');
    } catch (err) {
      setStatus('Failed to send');
    }
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-4">
        <input className="border p-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input className="border p-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <textarea className="border p-2" name="message" placeholder="Message" value={form.message} onChange={handleChange} />
        <button className="bg-indigo-500 text-white p-2 rounded" type="submit">Send</button>
        {status && <p className="text-center">{status}</p>}
      </form>
    </section>
  );
};

export default ContactForm;

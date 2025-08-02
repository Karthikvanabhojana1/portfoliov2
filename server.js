const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Simple calendar endpoint returning static events
app.get('/api/calendar', (req, res) => {
  const events = [
    { id: 1, summary: 'Consultation', start: '2025-01-10T10:00:00Z' },
    { id: 2, summary: 'Project Kickoff', start: '2025-01-15T15:00:00Z' },
  ];
  res.json(events);
});

// Email sending endpoint
app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;
  // Placeholder implementation: log to console
  console.log('Email request received', { name, email, message });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

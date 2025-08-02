const http = require('http');

const events = [
  { id: 1, date: '2025-08-10', title: 'Kickoff Meeting' },
  { id: 2, date: '2025-08-15', title: 'Deadline' }
];

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/calendar') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(events));
  } else if (req.method === 'POST' && req.url === '/api/send-email') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log('Email request:', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

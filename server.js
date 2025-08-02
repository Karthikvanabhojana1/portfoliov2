const http = require('http');

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (err) {
  console.error('Nodemailer not installed. Email sending will not work until it is installed.');
}

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/send-email') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        return;
      }

      const { name, email, message } = data;
      if (!name || !email || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Missing required fields' }));
        return;
      }

      try {
        if (!nodemailer) {
          throw new Error('Nodemailer module not available');
        }

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.SMTP_TO || process.env.SMTP_USER,
          subject: `Portfolio contact from ${name}`,
          replyTo: email,
          text: message,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error('Error sending email', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Failed to send email' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

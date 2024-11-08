const nodemailer = require('nodemailer');
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_HOST || !process.env.EMAIL_PORT) {
    throw new Error('Email configuration is incomplete in environment variables');
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,             // SMTP server from .env
    port: parseInt(process.env.EMAIL_PORT),   // Port from .env, converted to integer
    secure: process.env.EMAIL_SECURE === 'true', // SSL/TLS setting from .env (expects 'true' or 'false')
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up mail transporter:', error);
    } else {
        console.log('Mail transporter configured successfully');
    }
});

module.exports = transporter;

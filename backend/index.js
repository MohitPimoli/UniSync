const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.error('Kuch To gadbadh Hai', err);
        process.exit(1);
    });

// Rate limiting middleware to prevent brute-force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Schema for user data
const userSchema = new mongoose.Schema({
    Name: String,
    Username: String,
    Email: String,
    Pass: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('Users', userSchema);

// Nodemailer transport with environment variables for security
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST /reset: Password reset request
app.post('/reset', [
    body('email').isEmail().withMessage('Invalid email format')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.status(404).send({ message: 'User with this email does not exist' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = bcrypt.hashSync(token, 10);
        user.resetPasswordExpires = Date.now() + 600000;
        await user.save();

        const resetLink = `http://localhost:3000/forget/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.Email,
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested to reset your password. Please click on the following link to complete the process: ${resetLink}
            This link will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send({ message: 'Error sending reset email' });
            }
            res.status(200).send({ message: 'A reset link has been sent to your email address.' });
        });
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

// POST /reset-password: Reset the password
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user || !bcrypt.compareSync(token, user.resetPasswordToken)) {
            return res.status(400).send({ message: 'Password reset token is invalid or has expired.' });
        }

        const salt = bcrypt.genSaltSync(10);
        user.Pass = bcrypt.hashSync(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).send({ message: 'Your password has been successfully reset.' });
    } catch (err) {
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

// POST /register: Register a new user with input validation
app.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('CnfPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, CnfPassword } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(CnfPassword, salt);

        const user = new User({
            Name: name,
            Username: username,
            Email: email,
            Pass: hashedPassword
        });
        await user.save();
        res.send({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).send({ message: 'Server Side Error Occurred! Please Register Once Again' });
    }
});

// POST /login: User login with rate limiting
app.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ Username: username });

        if (!user) {
            res.status(401).send({ message: 'Invalid username or password' });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.Pass);

        if (!isPasswordValid) {
            res.status(401).send({ message: 'Invalid username or password' });
            return;
        }

        res.status(200).send({ message: 'Login successful' });
    } catch (err) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// Server listening on port 5001
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

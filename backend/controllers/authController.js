const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult, body } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

exports.register = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('confirmPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        console.log('Request Body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, username, email, confirmPassword } = req.body;

        try {
            const existingUser = await User.findOne({
                $or: [{ username: username }, { email: email }]
            });

            if (existingUser) {
                const errorMessage = existingUser.username === username
                    ? 'Username already exists'
                    : 'Email already exists';
                return res.status(400).json({ errors: [{ msg: errorMessage }] });
            }

            const hashedPassword = bcrypt.hashSync(confirmPassword, 10);
            const user = new User({ name, username, email, password: hashedPassword });
            await user.save();

            res.send({ message: 'Registration successful' });
            console.log("Registration successful");
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).send({ message: 'Server error. Please try again.' });
        }
    }
];

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(401).send({ message: 'Invalid username or password' });

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid username or password' });

        const jwtToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send({ message: 'Server error' });
    }
};

exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const email = payload['email'];
        const name = payload['name'];
        const sub = payload['sub'];

        let user = await User.findOne({ email: email });
        if (!user) {
            const defaultPassword = crypto.randomBytes(4).toString('hex');
            const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

            // Use the user's email as a fallback for the username
            const uniqueUsername = sub || email.split('@')[0];

            user = new User({
                name,
                username: uniqueUsername,
                email,
                password: hashedPassword
            });
            await user.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome! Your Account Details',
                html: `<p>Dear ${name},</p>
                       <p>Welcome to our platform! Your account has been successfully created.</p>
                       <p><strong>Username:</strong> ${uniqueUsername}</p>
                       <p><strong>Temporary Password:</strong> ${defaultPassword}</p>
                       <p>Please change your password after logging in for the first time.</p>
                       <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                       <p>Best regards,<br>Your Company Name</p>`
            };
            await sendMail(mailOptions);
        }

        const jwtToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ message: 'Login successful', token: jwtToken });
    } catch (error) {
        console.error('Error logging in with Google:', error);
        res.status(500).send({ message: 'Server error' });
    }
};


exports.requestPasswordReset = [
    body('email').isEmail().withMessage('Invalid email format'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user) return res.status(404).send({ message: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = bcrypt.hashSync(token, 10);
            user.resetPasswordExpires = Date.now() + 600000;
            await user.save();

            const resetLink = `http://localhost:3000/forget/${token}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Password Reset Request',
                html: ` <b>Dear ${user.name},</b> <p>We received a request to reset your password. Click the link below to reset your password:</p> <p><a href="${resetLink}">Reset Password</a></p> <p>This link will expire in 10 minutes.</p> <strong>If you did not request a password reset, please ignore this email or contact support if you have any questions.</strong> <p>Best regards,<br><b>Unisync<b></br> `
            };
            await sendMail(mailOptions);

            res.status(200).send({ message: 'Reset link sent to your email' });
        } catch (err) {
            console.error('Error processing request:', err);
            res.status(500).send({ message: 'Server error' });
        }
    }
];

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({ resetPasswordExpires: { $gt: Date.now() } });
        if (!user || !bcrypt.compareSync(token, user.resetPasswordToken)) {
            return res.status(400).send({ message: 'Invalid or expired token' });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).send({ message: 'Password has been reset' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).send({ message: 'Server error' });
    }
};

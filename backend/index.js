const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/unisync', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.error('Kuch To gadbadh Hai', err);
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    Name: String,
    Username: String,
    Email: String,
    Pass: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('Users', userSchema);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'noreply.unisync@gmail.com',
        pass: 'vdit dxwt jluw kfkz'
    }
});

app.post('/reset', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.status(404).send({ message: 'User with this email does not exist' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 600000; // 10 min from now
        await user.save();

        const resetLink = `http://localhost:3000/forget/${token}`; // Change to your front-end URL
        const mailOptions = {
            from: 'noreply.unisync@gmail.com',
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

app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
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

app.post('/register', async (req, res) => {
    const { name, username, email, CnfPassword } = req.body;

    if (!name || !username || !email || !CnfPassword) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }

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

app.post('/login', async (req, res) => {
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

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

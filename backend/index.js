const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-scripts.com"],
        styleSrc: ["'self'", "trusted-styles.com"],
        imgSrc: ["'self'", "data:", "trusted-images.com"],
        // Add other directives as needed
    }
}));

const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Pass: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String, required: true },
    media: String,
    createdAt: { type: Date, default: Date.now }
});
const connectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requests: [{
        requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'] }
    }]
});

const User = mongoose.model('Users', userSchema);
const Post = mongoose.model('Posts', postSchema);
const Connection = mongoose.model('Connection', connectionSchema);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

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
        user.resetPasswordExpires = Date.now() + 600000; // 10 minutes expiration
        await user.save();

        const resetLink = `http://localhost:3000/forget/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.Email,
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested to reset your password. Please click on the following link to complete the process: ${resetLink}
            This link will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.`
        };

        await sendMail(mailOptions);

        res.status(200).send({ message: 'A reset link has been sent to your email address.' });
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

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
        console.error('Error resetting password:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

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
        console.error('Error registering user:', err);
        res.status(500).send({ message: 'Server Side Error Occurred! Please Register Once Again' });
    }
});

app.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        let user = await User.findOne({ Email: email });

        if (!user) {
            // Generate a default password
            const defaultPassword = crypto.randomBytes(4).toString('hex'); // Generate a random password
            const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

            // Create a new user with the default password
            user = new User({
                Name: name,
                Username: googleId,
                Email: email,
                Pass: hashedPassword,
            });
            await user.save();

            // Send the default password to the user's email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome! Your Account Details',
                text: `Welcome, ${name}! Your account has been created. Here is your default password: ${defaultPassword}. Please change it after logging in.`,
            };

            await sendMail(mailOptions);
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { userId: user._id, username: user.Username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ message: 'Login successful', token: jwtToken });
    } catch (error) {
        console.error('Error logging in with Google:', error);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

app.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ Username: username });

        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.Pass);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.Username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send({ message: 'Error logging in' });
    }
});

app.post('/create-post', authenticateToken, upload.single('media'), async (req, res) => {
    const { content } = req.body;
    const userId = req.user.userId;

    try {
        let mediaUrl = null;
        if (req.file) {
            mediaUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const post = new Post({
            userId,
            content,
            media: mediaUrl
        });

        await post.save();
        res.status(200).send({ message: 'Post created successfully', post });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'Name Username');
        res.status(200).send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

app.get('/user/:userId/posts', authenticateToken, async (req, res) => {
    const { userId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }

        const posts = await Post.find({ userId }).populate('userId', 'Name Username');

        if (!posts.length) {
            return res.status(404).send({ message: 'No posts found for this user' });
        }

        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

app.get('/connection-requests', authenticateToken, async (req, res) => {
    try {
        const connection = await Connection.findOne({ userId: req.user.userId }).populate('requests.requesterId', 'Name Username');
        if (!connection) {
            return res.status(404).send({ message: 'No connection requests found' });
        }
        res.status(200).json(connection.requests);
    } catch (err) {
        console.error('Error fetching connection requests:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

app.post('/send-request', authenticateToken, async (req, res) => {
    const { receiverId } = req.body;

    try {
        if (receiverId === req.user.userId) {
            return res.status(400).send({ message: 'You cannot send a request to yourself' });
        }

        let connection = await Connection.findOne({ userId: receiverId });

        if (!connection) {
            connection = new Connection({
                userId: receiverId,
                requests: [{ requesterId: req.user.userId }]
            });
        } else {
            connection.requests.push({ requesterId: req.user.userId });
        }

        await connection.save();
        io.emit("new-request", { requesterId: req.user.userId });
        res.status(200).send({ message: 'Connection request sent successfully' });
    } catch (err) {
        console.error('Error sending connection request:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
